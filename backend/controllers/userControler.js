import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken' // authentication
import bcrypt from 'bcrypt'
import validator from 'validator'


// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await userModel.findOne({ email })

        if (!user) {
            res.json({ success: false, message: "User Doesn't Exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" })
        }
        const token = createToken(user._id)
        res.json({ success: true, token });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

// token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}
// register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const exists = await userModel.findOne({ email })
        // checking if user already exists
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // validate email format and a strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // check password length > 8 digits
        if (password.length < 8) {
            return res.json({ success: false, message: 'Please enter a strong password' });
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // range should be between 5 to 15
        const hashedPassword = await bcrypt.hash(password, salt);

        // create a new user instance
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        // save the new user to the database
        await newUser.save();

        // After successful registration, generate JWT token
        const token = createToken(newUser._id);

        // Return success message along with the token
        res.json({ success: true, token, message: 'User registered successfully' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}




export { loginUser, registerUser }