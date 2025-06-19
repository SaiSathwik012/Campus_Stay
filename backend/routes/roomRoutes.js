const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

router.get('/', async (req, res) => {
    try {
        const rooms = await Room.find().sort({ createdAt: -1 });
        res.json(rooms);
    } catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json(room);
    } catch (error) {
        console.error('Error fetching room:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
router.post('/', async (req, res) => {
    try {
        if (!req.files || !req.files.roomPictures) {
            return res.status(400).json({ error: 'Please upload at least one image' });
        }

        const files = Array.isArray(req.files.roomPictures)
            ? req.files.roomPictures
            : [req.files.roomPictures];

        const picturePaths = [];

        // Process all uploaded files
        for (const file of files) {
            const filename = Date.now() + '-' + file.name;
            const uploadPath = path.join(uploadDir, filename);
            await file.mv(uploadPath);
            picturePaths.push(`/uploads/${filename}`);
        }

        // Convert string values to appropriate types
        const roomData = {
            ...req.body,
            roomPictures: picturePaths,
            agreement: req.body.agreement === 'true',
            bedrooms: parseInt(req.body.bedrooms),
            duration: parseInt(req.body.duration),
            rent: parseFloat(req.body.rent),
            availableFrom: new Date(req.body.availableFrom)
        };

        // Validate the room data
        const newRoom = new Room(roomData);
        const validationError = newRoom.validateSync();
        if (validationError) {
            // Clean up uploaded files if validation fails
            picturePaths.forEach(pic => {
                const filePath = path.join(__dirname, '..', pic);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            });
            return res.status(400).json({ error: validationError.message });
        }

        await newRoom.save();
        res.status(201).json(newRoom);
    } catch (error) {
        console.error('Error creating room:', error);
        res.status(500).json({
            error: 'Server error',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Add this to backend/routes/roomRoutes.js
router.delete('/:id', async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        // Delete associated pictures
        if (room.roomPictures && room.roomPictures.length > 0) {
            room.roomPictures.forEach(pic => {
                const filePath = path.join(__dirname, '..', pic);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            });
        }

        res.json({ message: 'Room deleted successfully' });
    } catch (error) {
        console.error('Error deleting room:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;