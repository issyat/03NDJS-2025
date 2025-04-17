import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Register
export async function register(req, res) {
    const { email, password, isAdmin } = req.body;

    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            email,
            password: hashedPassword,
            isAdmin: isAdmin || false,
        });

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: {
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                id: newUser._id,
            },
        });

        // Save user to database
        await newUser.save();

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Login

export async function login(req, res) {
    const { email, password } = req.body;

    // Vérifie que l'email et le mot de passe sont fournis
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const theUser = await User.findOne({ email });
        if (!theUser) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Compare password
        const isMatch = await bcrypt.compare(password, theUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jwt.sign({ id: theUser._id, isAdmin: theUser.isAdmin }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
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
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
