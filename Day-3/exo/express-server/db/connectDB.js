// Importing mongoose to handle MongoDB connections
import mongoose from 'mongoose';

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        // Attempting to connect to the database using the connection string from environment variables
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, // Use the new URL parser
            useUnifiedTopology: true, // Use the new server discovery and monitoring engine
        });
        // Log a success message if the connection is established
        console.log('MongoDB connected');
    } catch (err) {
        // Log an error message if the connection fails
        console.error('MongoDB connection error:', err);
        // Exit the process with a failure code
        process.exit(1);
    }
};

// Exporting the connectDB function for use in other parts of the application
export default connectDB;