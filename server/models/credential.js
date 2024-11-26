import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const credentialSchema = new mongoose.Schema({
    name:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        // required: true 
    },
    connector:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Connector',
        // required: true 
    },
    apikey:
        [
            {
                type: Object,
                // required: true
            }
        ],

}, {
    timestamps: true
});

const Credential = mongoose.model('Credential', credentialSchema);
export default Credential;
