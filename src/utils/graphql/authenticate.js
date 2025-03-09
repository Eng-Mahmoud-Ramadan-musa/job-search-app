import { User } from "../../db/models/user.model.js";
import { verifyToken } from "../token/token.js";

export const isAuthenticate = async (context) => {
        const { authorization } = context;

    
        // check token
        if (!authorization || !authorization.startsWith(process.env.BEARER_KEY)) throw new Error("invalid token or bearer key", {cause: 403})
            // extract token
        const token = authorization.split(" ")[1];
        // verify token
        
        const result = verifyToken({payload: token});
    
        if(result.error) throw new Error("Token verification failed", {cause: 400})
        const userExist = await User.findById(result.id);
        
        if (!userExist) throw new Error("user not authenticated" ,{cause: 404})
        if (userExist.isDeleted == true) throw new Error("login first!" ,{cause: 400})
        if (userExist.deletedAt && (userExist.deletedAt.getTime() > iat * 1000)) throw new Error("destroy token");
        
        context.authUser = userExist;
        
        return true;  
}