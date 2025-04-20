import User from '../models/User.js';

export const getCurrentUser = async (req, res) => {
  try {
    // Find the current user by ID and exclude the password field
    const user = await User.findById(req.user.userId).select('-password');
    res.status(200).json({
      message: 'User retrieved successfully',
      user,
    });
  } catch {
    // Handle server errors
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    // Retrieve all users from the database and exclude the password field
    const users = await User.find().select('-password');
    res.status(200).json({
      message: 'Users retrieved successfully',
      users,
    });
  } catch {
    // Handle server errors
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
