import mongoose from 'mongoose';

const Product = new mongoose.model('product', new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' }
}, {
    tmestamp: true
}));

export default Product;