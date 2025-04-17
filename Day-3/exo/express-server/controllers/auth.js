import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Register a new user
export async function register(req, res) {
    const { email, password, isAdmin } = req.body;

    try {
        // Check if a user with the provided email already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the provided password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object
        const newUser = new User({
            email,
            password: hashedPassword,
            isAdmin: isAdmin || false,
        });

        // Respond with success message and user details
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: {
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                id: newUser._id,
            },
        });

        // Save the new user to the database
        await newUser.save();

    } catch (error) {
        // Log the error and respond with a server error message
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Login an existing user
export async function login(req, res) {
    const { email, password } = req.body;

    // Ensure both email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Find the user by email
        const theUser = await User.findOne({ email });
        if (!theUser) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, theUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Generate a JWT token for the user
        const token = jwt.sign({ id: theUser._id, isAdmin: theUser.isAdmin }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        // Respond with success message, user details, and the token
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                email: theUser.email,
                isAdmin: theUser.isAdmin,
                id: theUser._id,
            },
            token,
        });
    } catch (error) {
        // Log the error and respond with a server error message
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}