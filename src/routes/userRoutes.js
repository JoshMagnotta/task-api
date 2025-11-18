import express from 'express';
import { getAllUsersHandler, getCurrentUserHandler, setCurrentUserHandler, deleteCurrentUserHandler} from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.get('/', authenticate, getAllUsersHandler);

router.get('/me', authenticate, getCurrentUserHandler);

router.put('/me', authenticate, setCurrentUserHandler);

router.delete('/me', authenticate, deleteCurrentUserHandler);



export default router;