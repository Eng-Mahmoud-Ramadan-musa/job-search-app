import express from 'express';
import dotenv from 'dotenv';
import bootstrap from './src/app.controller.js';
import { initSocket } from './src/socket.io/index.js';

const app = express();
dotenv.config();
await bootstrap(app, express);

const server = app.listen(3000 || process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
    });

initSocket(server);
