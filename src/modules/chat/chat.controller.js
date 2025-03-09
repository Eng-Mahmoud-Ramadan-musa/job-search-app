import {Router} from 'express';
import * as chatService from './chat.service.js'
import * as chatValidation from './chat.validation.js'
import { isAuthenticate, isValid } from '../../middleware/index.js';
import { asyncHandler} from '../../utils/index.js';

const router = Router();

// get all my chat
router.get('/:receiverId',
    isAuthenticate, 
    isValid(chatValidation.idChatSchema),
    asyncHandler(chatService.getChat)
);

export default router;