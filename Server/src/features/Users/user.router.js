import express from 'express';
import { userRegistration } from './user.controller.js';

const router = express.Router();

router.route('/signup').post(userRegistration);