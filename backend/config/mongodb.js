import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Listen for successful connection
        mongoose.connection.on('connected', () => console.log("Database Connected"));

        // Connect to the MongoDB database
        await mongoose.connect(`${process.env.MONGODB_URI}/curapoint`, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            writeConcern: { w: 'majority' }  // Set the write concern here
        });
    } catch (error) {
        console.error("Database connection error: ", error);
    }
};

export default connectDB;
