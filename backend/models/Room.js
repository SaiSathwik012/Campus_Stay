const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    ownerName: { type: String, required: true },
    roomPictures: [String],
    fullAddress: { type: String, required: true },
    forWhom: { type: String, enum: ['Boys', 'Girls', 'Both'], required: true },
    availabilityStatus: { type: String, enum: ['Available', 'Unavailable'], required: true },
    availableFrom: { type: Date, required: true },
    roomType: { type: String, required: true },
    duration: { type: Number, required: true },
    roomCapacity: { type: String, required: true },
    distanceToCollege: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    kitchen: { type: String, enum: ['Yes', 'No', 'Shared'], required: true },
    facilities: { type: String, required: true },
    rent: { type: Number, required: true },
    contactNumber: { type: String, required: true, match: /^\d{10}$/ },
    wifi: { type: String, enum: ['Yes', 'No'], required: true },
    parking: { type: String, enum: ['Yes', 'No'], required: true },
    medicalNearby: { type: String, enum: ['Yes', 'No'], required: true },
    drinkingWater: { type: String, enum: ['Yes', 'No'], required: true },
    restaurantsNearby: { type: String, enum: ['Yes', 'No'], required: true },
    agreement: { type: Boolean, required: true }
});

module.exports = mongoose.model('Room', roomSchema);
