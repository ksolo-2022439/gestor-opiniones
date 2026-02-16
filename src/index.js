import { initServer } from './configs/app.js';
import { dbConnection } from './configs/mongo.js';
import { config } from 'dotenv';

config();

const startServer = async () => {
    try {
        await dbConnection();
        const app = initServer();

        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.log(`Server init failed: ${error}`);
    }
}

startServer();