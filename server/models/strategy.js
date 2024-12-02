import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const tradingSchema = new mongoose.Schema({
    name: { type: String },
    symbol: { type: String },
    baseCurrency: { type: String },
    quoteCurrency: { type: String },
    feeCurrency: { type: String },
    market: { type: String },
    baseMinSize: { type: String },
    quoteMinSize: { type: String },
    baseMaxSize: { type: String },
    quotenaxSize: { type: String },
    baseIncrement: { type: String },
    quoteIncrement: { type: String },
    priceIncrement: { type: String },
    priceLimitRate: { type: String },
    minFunds: { type: String },
    isMarginEnabled: { type: Boolean },
    enableTrading: { type: Boolean },
    feeCategory: { type: Number },
    makerFeeCoefficient: { type: String },
    takerFeeCoefficient: { type: String },
    st: { type: Boolean },
    callauctionIsEnabled: { type: Boolean },
    callauctionPriceCeiling: { type: String },
    callauctionPriceFloor: { type: String },
    callauctionFirstStageStartTime: { type: String },
    callauctionSecondStageStartTime: { type: String },
    callauctionThirdStageStartTime: { type: String },
    tradingStartTime: { type: String },
}, {
    timestamps: true
});

const trading = mongoose.model('Trading', tradingSchema);
export default trading;
