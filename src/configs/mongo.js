import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        mongoose.connection.on('error', () => {
            mongoose.disconnect();
        });
        mongoose.connection.on('connecting', () => {
            console.log('Try connecting to database');
        });
        mongoose.connection.on('connected', () => {
            console.log('Connected to database');
        });
        mongoose.connection.on('open', () => {
            console.log('Connected to database');
        });
        mongoose.connection.on('reconnected', () => {
            console.log('Reconnected to database');
        });
        mongoose.connection.on('disconnected', () => {
            console.log('Disconnected to database');
        });

        await mongoose.connect(process.env.DB_URI, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50
        });
    } catch (error) {
        console.log(`Database connection failed: ${error}`);
    }
}