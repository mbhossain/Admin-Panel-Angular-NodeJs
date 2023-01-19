import express from "express";


import {
    register
    , login
    , passwordReset
    , passwordUpdated
} from '../controllers/auth-controller.js'

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.post('/password-reset', passwordReset);
router.post('/password-reset/:userId/:token', passwordUpdated);

export default router