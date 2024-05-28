import mongoose from "mongoose";

const newsletterSignupSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

const NewsletterSignupModel = mongoose.model("newsletterSignup", newsletterSignupSchema );


const newsletterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const NewsletterModel = mongoose.model("newsletter", newsletterSchema );


export {NewsletterSignupModel, NewsletterModel};