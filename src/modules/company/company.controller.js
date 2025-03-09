import {Router} from 'express';
import * as companyService from './company.service.js'
import * as companyValidation from './company.validation.js'
import { isAuthenticate, isValid } from '../../middleware/index.js';
import { asyncHandler, cloudUpload, fileValidation} from '../../utils/index.js';

const router = Router();

// add company
router.post('/',
    isAuthenticate, 
    isValid(companyValidation.addCompanySchema),
    asyncHandler(companyService.addCompany)
);

// update data
router.put('/:id',
    isAuthenticate, 
    isValid(companyValidation.updateCompanySchema),
    asyncHandler(companyService.updateCompany)
);

//  soft-delete
router.delete('/soft-delete/:id',
    isAuthenticate,
    isValid(companyValidation.idCompanySchema),
    asyncHandler(companyService.softDelete)
);

// search by name
router.get('/search-by-name',
    isAuthenticate, 
    isValid(companyValidation.searchByNameSchema),
    asyncHandler(companyService.searchByName)
);

// get company specific
router.get('/:id',
    isAuthenticate, 
    isValid(companyValidation.idCompanySchema),
    asyncHandler(companyService.getCompanySpecific)
);

// upload logo
router.post('/upload-logo',
    isAuthenticate,
    cloudUpload(fileValidation.images).single("logo"),
    isValid(companyValidation.logoSchema,"logo"),
    asyncHandler(companyService.uploadLogo)
);

// upload coverPic
router.post('/upload-coverPic',
    isAuthenticate,
    cloudUpload(fileValidation.images).single("coverPic"),
    isValid(companyValidation.coverPicSchema, "coverPic"),
    asyncHandler(companyService.uploadCoverPic)
);

// delete logo
router.delete('/delete-logo',
    isAuthenticate,
    isValid(companyValidation.publicIdSchema),
    asyncHandler(companyService.deleteLogo)
);

// delete coverPic
router.delete('/delete-coverPic',
    isAuthenticate,
    isValid(companyValidation.publicIdSchema),
    asyncHandler(companyService.deleteCoverPic)
);

// export-applications
// router.get("/export-applications/:companyId/:date",
//     isAuthenticate,
//     isValid(companyValidation.publicIdSchema),
//     asyncHandler(companyService.excelSheet)
// );

export default router;