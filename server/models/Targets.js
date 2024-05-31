import mongoose from "mongoose";


const targetSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    goals: [
        {
            title: {
            type: String,
            required: true,
            },
            note: {
                type: String
            },
            value: {
                type: Number,
                required: true
            }
        }
    ]
});



const TargetModel = mongoose.model("target", targetSchema );


export default TargetModel;