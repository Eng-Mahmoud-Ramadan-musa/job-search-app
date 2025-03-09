import { createHandler } from 'graphql-http/lib/use/express';
import cors from 'cors';
import connectDB from './db/connectDB.js';
import * as routers from './modules/index.js';
import { globalErrorHandler, notFoundHandler } from './utils/index.js';
import { schema } from './graphql/app.schema.js';

const bootstrap = async (app, express) => {
    app.use(cors());

    // Connect to database
    await connectDB();

    // Middleware
    app.use(express.json());

    // route for graphql api
    app.all("/graphql", createHandler({ schema, context: (req) => {
        const {authorization} = req.headers;
        return { authorization };
    }, 
    formatError: (error) => {
        return {
            success: false,
            statusCode: error.cause || 500,
            message: error.message,
            // stack: error.stack,
        }
    }
    }));

    // Routes for restful api
    app.use('/auth', routers.authRouter);
    app.use('/user', routers.userRouter);
    app.use('/company', routers.companyRouter);
    app.use('/job', routers.jobRouter);
    app.use('/chat', routers.chatRouter);


    // Error handler
    app.all('*', notFoundHandler);
    app.use(globalErrorHandler);
};

export default bootstrap;
