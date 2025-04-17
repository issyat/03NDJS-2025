import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { isValidEmail, isValidPassword } from '../utils/validators.js';

export const registerUser = async (req, res) => {
    const { email, password, isAdmin } = req.body;

    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }
    if (!isValidPassword(password)) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user and save it to the database
        user = new User({ email, password: hashedPassword, isAdmin: isAdmin || false });
        await user.save();

        // Respond with the created user's details
        res.status(201).json({
            email: user.email,
            isAdmin: user.isAdmin,
            id: user._id,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user by email and compare the provided password with the stored hashed password
        const user = await User.findOne({ email });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!user || !isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        // Generate a JWT token with user details and expiration time
        const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};