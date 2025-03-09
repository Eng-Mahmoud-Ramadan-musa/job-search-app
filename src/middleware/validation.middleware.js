export const isValid = (schema, fileName = "attachment") => {
    return async (req, res, next) => {
        try {
            const data ={...req.body ,...req.params, ...req.query}
        
            if(req.file || req.files) {
                data[fileName] = req.file || req.files
            }
            
            const {error} = schema.validate(data, { abortEarly: false });
    
            if (error) {
                return next(new Error(error.details.map((err) => err.message),{cause: 400}))
            }
    
            return next();
            
        } catch (error) {
            return next(error)
        }
    
    };
};

