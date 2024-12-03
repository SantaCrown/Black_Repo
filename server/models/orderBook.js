import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const orderBookSchema = new mongoose.Schema({
    orderbook : {
        type : Object,
        require : true
    }
}, {
    timestamps: true
});

const order = mongoose.model('Orderbook', orderBookSchema);
export default order;
