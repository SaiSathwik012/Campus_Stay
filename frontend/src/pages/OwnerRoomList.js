import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OwnerRoomList = () => {
    const [rooms, setRooms] = useState([]);
    const token = localStorage.getItem('token'); // Make sure token is saved here after login

    const fetchRooms = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/rooms');
            setRooms(data.data.filter(room => room.owner._id === JSON.parse(atob(token.split('.')[1])).id));
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    const deleteRoom = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/rooms/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRooms(rooms.filter(room => room._id !== id));
        } catch (error) {
            console.error('Error deleting room:', error.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <div>
            <h2>My Rooms</h2>
            <ul>
                {rooms.map(room => (
                    <li key={room._id}>
                        <strong>{room.title}</strong> - {room.description}
                        <button onClick={() => deleteRoom(room._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OwnerRoomList;
