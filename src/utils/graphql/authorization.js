
export const isAuthorized = (context , roles) => {
        if (!roles.includes(context.authUser.role)) 
            throw new Error(`Not Authorized 😡`,{cause: 401});
}