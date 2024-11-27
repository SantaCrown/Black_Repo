import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const connectorSchema = new mongoose.Schema({
    name: { type: String, required: true },

},{
    timestamps : true
});

const connector = mongoose.model('Connector', connectorSchema);
export default connector;
