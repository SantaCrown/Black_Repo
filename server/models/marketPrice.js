import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const marketPriceSchema = new mongoose.Schema({
    marketprice : {
        type : Object,
        require : true
    }
}, {
    timestamps: true
});

const marketPrice = mongoose.model('MarketPrice', marketPriceSchema);
export default marketPrice;
