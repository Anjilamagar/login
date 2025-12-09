

import mongoose from 'mongoose';

const User = mongoose.model('user', new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/, trim: true },
    password: {
        type: String, required: true, minlength: 8
    },
    phone: {
        type: String, required: true, match: /^9\d{9}$/, message: 'phone number must be a 10-digit', minlength: 10,
        maxlength: 10, validate: {
            validator: function (value) {
                // +1234567890 or 9876543210
                return /^(\+\d{1,3})?\d{7,12}$/.test(value);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    isVerified: { type: Boolean, default: false },
    role: { type: String, enum: ['ADMIN', 'USER'], default: "USER" } // user / admin
}));

export default User;