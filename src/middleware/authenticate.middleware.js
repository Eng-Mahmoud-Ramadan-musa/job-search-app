import { User } from "../db/models/index.js";
import { messages, verifyToken } from "../utils/index.js";

export const isAuthenticate = async (req , res, next) => {
    
    const { authorization } = req.headers;
    
    // check token
    if (!authorization || !authorization.startsWith(process.env.BEARER_KEY)) return next(new Error(messages.USER.tokenIsRequired, {cause: 403}))
        // extract token
    const token = authorization.split(" ")[1];
    // verify token
    
    const result = verifyToken({payload: token});

    if(result.error) return next(new Error("Token verification failed", {cause: 400}))
    const userExist = await User.findById(result.id);
    
    if (!userExist) return next(new Error(messages.USER.notFound ,{cause: 404}))
    if (userExist.deletedAt && (userExist.deletedAt.getTime() > iat * 1000)) return next(new Error(messages.USER.destroyToken));
    
    req.userExist = userExist;
    return next()    
}