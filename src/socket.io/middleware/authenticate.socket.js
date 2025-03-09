import { User } from "../../db/models/index.js";
import {  messages, verifyToken } from "../../utils/index.js";

export const AuthSocket = async (socket, next) => {
    try {
        const { authorization } = socket.handshake.auth;
    
        // check token
        if (!authorization || !authorization.startsWith(process.env.BEARER_KEY)) return next(new Error(messages.USER.tokenIsRequired))
            // extract token
        const token = authorization.split(" ")[1];
        // verify token
        
        const result = verifyToken({payload: token});
    
        if(result.error) return next(new Error("Token verification failed"))
        const userExist = await User.findById(result.id);
        
        if (!userExist) return next(new Error(messages.USER.notFound ))
        if (userExist.deletedAt && (userExist.deletedAt.getTime() > iat * 1000)) return next(new Error(messages.USER.destroyToken));
        
        socket.userExist = userExist;
        socket.id = userExist.id
        return next() 
    } catch (error) {
        return next(error) 
        
    }   
}