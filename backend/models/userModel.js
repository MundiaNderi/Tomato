import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} }
}, { minimize: false }) // cart data entry will be created without any data


const userModel = mongoose.models.user || mongoose.model("user", userSchema); // if the model is created, the model will be used otherwise it will be created

export default userModel;