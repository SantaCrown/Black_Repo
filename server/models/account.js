import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const accountSchema = new mongoose.Schema({
    name: { type: String, required: true },

}, {
    timestamps: true
});

const account = mongoose.model('Account', accountSchema);
export default account;
