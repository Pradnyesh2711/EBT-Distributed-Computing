import mongoose from 'mongoose'
async function connectDatabase() {
    try {
        await mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Successfully Connected to the database!");
    } catch (error) {
        console.error("Database connection error", error);
    }
};

export default connectDatabase;