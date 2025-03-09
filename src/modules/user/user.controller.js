import {Router} from 'express';
import * as userService from './user.service.js'
import * as userValidation from './user.validation.js'
import { isAuthenticate, isValid } from '../../middleware/index.js';
import { asyncHandler, cloudUpload, fileValidation} from '../../utils/index.js';

const router = Router();

// get profile
router.get('/profile',
    isAuthenticate, 
    asyncHandler(userService.myProfile)
);

// get profile user specific
router.get('/profile/:id',
    isAuthenticate, 
    isValid(userValidation.profileSpecificSchema),
    asyncHandler(userService.ProfileUserSpecific)
);
 
//  soft-delete
router.delete('/soft-delete',
    isAuthenticate, 
    asyncHandler(userService.softDelete)
);

// update account
router.put('/update-account',
    isAuthenticate, 
    isValid(userValidation.updateAccountSchema),
    asyncHandler(userService.updateAccount)
);

// update password
router.patch('/update-password',
    isAuthenticate, 
    isValid(userValidation.updatePasswordSchema),
    asyncHandler(userService.updatePassword)
);

// upload profilePic
router.post('/upload-profilePic',
    isAuthenticate,
    cloudUpload(fileValidation.images).single("profilePic"),
    isValid(userValidation.profilePicSchema,"profilePic"),
    asyncHandler(userService.uploadProfilePic)
);

// upload coverPic
router.post('/upload-coverPic',
    isAuthenticate,
    cloudUpload(fileValidation.images).single("coverPic"),
    isValid(userValidation.coverPicSchema,"coverPic"),
    asyncHandler(userService.uploadCoverPic)
);

// delete profilePic
router.delete('/delete-profilePic',
    isAuthenticate,
    isValid(userValidation.publicIdSchema),
    asyncHandler(userService.deleteProfilePic)
);

// delete coverPic
router.delete('/delete-coverPic',
    isAuthenticate,
   isValid(userValidation.publicIdSchema), 
    asyncHandler(userService.deleteCoverPic)
);

export default router;