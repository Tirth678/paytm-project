import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Users',
        required: true
    },
    balance : {
        type: Number,
        required: true
    }
})

const accountModel = mongoose.model("accounts", accountSchema);

export default accountModel;