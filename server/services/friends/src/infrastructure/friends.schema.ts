import mongoose from 'mongoose';

export const friendSchema = new mongoose.Schema({
    senderId: {
        type: String,
        required: true,
    },
    senderName: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
        required: true,
    },
    receiverName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'blocked'],
        default: 'pending',
    },
}, { timestamps: true });