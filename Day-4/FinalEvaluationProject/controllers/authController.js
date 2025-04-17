import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { handleMongooseError } from '../utils/handleMongooseErrors.js';

// Register User
export const registerUser = async (req, res) => {
    const { email, password, isAdmin } = req.body;
    const user = new User({ email, password, isAdmin });

    try {
        // Validate user object before saving
        await user.validate();

        // Check if user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;

        // Save the user to the database
        await user.save();

        // Respond with the created user's details (don't send password)
        res.status(201).json({
            email: user.email,
            isAdmin: user.isAdmin,
            id: user._id,
        });
    } catch (err) {
        const errorResponse = handleMongooseError(err);
        res.status(errorResponse.status).json(errorResponse);
    }
};

// Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token with user details and expiration time
        const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
