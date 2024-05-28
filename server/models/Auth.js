import mongoose from "mongoose";

const adminAuthSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const AdminAuthModel = mongoose.model("adminAuth", adminAuthSchema);


const userAuthSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const UserAuthModel = mongoose.model("userAuth", userAuthSchema);


export { AdminAuthModel, UserAuthModel};