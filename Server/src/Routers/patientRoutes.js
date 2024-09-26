import express from 'express'
import { doctorRegister, patientRegister } from '../Controller/user.controller.js';
import { userLogin } from '../Repository/user.repository.js';

const router = express.Router();

router.route('/patient/register').post(patientRegister);
router.route('/doctor/register').post(doctorRegister);
router.route('/login').post(userLogin);


export default router;