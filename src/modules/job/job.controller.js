import {Router} from 'express';
import * as jobService from './job.service.js'
import * as jobValidation from './job.validation.js'
import { isAuthenticate, isAuthorized, isValid } from '../../middleware/index.js';
import { asyncHandler, cloudUpload, fileValidation} from '../../utils/index.js';
import { roles } from '../../db/models/helper/object.helper.js';

const router = Router();

// add job
router.post('/add-job',
    isAuthenticate, 
    isValid(jobValidation.addJobSchema),
    asyncHandler(jobService.addJob)
);

// update job
router.put('/:id',
    isAuthenticate, 
    isValid(jobValidation.updateJobSchema),
    asyncHandler(jobService.updateJob)
);

//  delete
router.delete('/:id',
    isAuthenticate,
    isValid(jobValidation.idJobSchema),
    asyncHandler(jobService.deleteJob)
);

// get all jobs
router.get('/all-jobs',
    isAuthenticate, 
    isValid(jobValidation.allJobsSchema),
    asyncHandler(jobService.getJobs)
);
 
// get all jobs filter
router.get('/jobs-filter',
    isAuthenticate, 
    // isValid(jobValidation.idSchema),
    asyncHandler(jobService.filerJobs)
);

// get all jobs application
router.get('/all-jobs-application/:id',
    isAuthenticate, 
    isValid(jobValidation.idJobSchema),
    asyncHandler(jobService.getJobApplications)
);

// apply to job
router.post('/apply-job',
    isAuthenticate,
    isAuthorized(roles.USER),
    cloudUpload(fileValidation.files).single("cv"),
    isValid(jobValidation.applyJobSchema, "cv"),
    asyncHandler(jobService.applyToJob)
);

// accept or reject
router.post('/accept-or-reject/:applicationId',
    isAuthenticate,
    isValid(jobValidation.acceptOrRejectSchema),
    asyncHandler(jobService.acceptOrReject)
);



export default router;