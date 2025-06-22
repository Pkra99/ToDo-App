import {Router} from 'express';
import {registerUser, loginUser, logoutUser, refreshAccessToken, updatePassword} from '../controllers/userController.js';
import { verifyJWT } from '../middleware/authMiddleware.js';

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJWT, logoutUser);
router.route('/refresh-token').post(refreshAccessToken)
router.route('/update-password').post(verifyJWT, updatePassword);

export default router;