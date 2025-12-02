import mongoose from 'mongoose';

const Category = mongoose.model('category', new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: { type: String }
},
    {
        timestamps: true

    }))

export default Category;