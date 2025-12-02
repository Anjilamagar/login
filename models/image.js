// import mongoose from 'mongoose';

// const image = new mongoose.Schema({
//     product: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Product',   // links to Product
//         required: true
//     },
//     url: { type: String, required: true },
//     alt: { type: String },
//     is_primary:
//         uploaded - date:
//     image_type:
//         uploadedAt: { type: Date, default: Date.now }
// });

// export default image;



import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",       // links each image to a product
            required: true
        },
        url: {
            type: String,
            required: [true, "Image URL is required"],
            trim: true
        },
        alt: {
            type: String,
            trim: true,
            default: ""
        },
        uploadedAt: {
            type: Date,
            default: Date.now     // records upload time (never changes)
        }
    }
);

export default image;
