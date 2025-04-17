// Importing Schema and model from mongoose to define a MongoDB schema and create a model
import {Schema, model} from 'mongoose';

// Defining the schema for the User model
const userSchema = new Schema({
    // Email field: must be a string, required, and unique
    email: {
        type: String,
        required: true,
        unique: true,
    },
    // Password field: must be a string and is required
    password: {
        type: String,
        required: true,
    },
    // isAdmin field: boolean value to indicate if the user is an admin, defaults to false
    isAdmin: {
        type: Boolean,
        default: false,
    },
}); 

// Creating the User model using the defined schema
const User = model('User', userSchema);

// Exporting the User model for use in other parts of the application
export default User;