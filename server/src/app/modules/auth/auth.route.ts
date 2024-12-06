import express from 'express';
import { logout, signin, signup } from './auth.controller';

const router = express.Router();

// Define routes for signup and signin
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/logout', logout);

export const AuthRoutes = router;
