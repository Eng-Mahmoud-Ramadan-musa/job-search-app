import {Router} from 'express';
import * as authService from './auth.service.js'
import * as authValidation from './auth.validation.js';
import { isValid } from '../../middleware/index.js';
import { asyncHandler } from '../../utils/index.js';


const router = Router();
// register
router.post('/signup',
    // cloudUpload(fileValidation.images).single("image"),
    isValid(authValidation.registerSchema),
    asyncHandler(authService.register)
);

// confirm email
router.post("/confirm", 
        // cloudUpload(fileValidation.images).single("image"),
        isValid(authValidation.confirmSchema),
        asyncHandler(authService.confirm)
);

// login
router.post('/signin', 
    isValid(authValidation.loginSchema),
    asyncHandler(authService.login)
);

// forget password
router.post('/forget-password', 
    isValid(authValidation.forgetPasswordSchema),
    asyncHandler(authService.forgetPassword)
);

// reset password
router.patch('/reset-password', 
    isValid(authValidation.resetPasswordSchema),
    asyncHandler(authService.resetPassword)
);

// google login
router.post('/google-login', 
    isValid(authValidation.googleLoginSchema),
    asyncHandler(authService.googleLogin)
);

// refresh token
router.post('/refresh-token', 
    isValid(authValidation.refreshTokenSchema),
    asyncHandler(authService.refreshToken)
);

export default router;