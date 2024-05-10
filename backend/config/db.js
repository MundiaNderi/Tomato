import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://sarahngima77:FiDHTv1eY9zhNKfm@cluster0.u7zwube.mongodb.net/food-del"
    )
    .then(() => console.log("DB connected"));
};
