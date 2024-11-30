import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const botSchema = new mongoose.Schema({
    botName: { type: String, required: true },
    size: { type: String, required: true },
    profit: { type: String, required: true },
    mode: { type: String, required: true },
    connector: { type:Object, required: true },
    trading: { type: Object, required: true },

}, {
    timestamps: true
});

const bot = mongoose.model('Bot', botSchema);
export default bot;
