import express from 'express';
import * as softwareEngineerApplicationController from '../controllers/applicationController';

const router = express.Router();

// Create
router.post('/', softwareEngineerApplicationController.createApplication);


export default router;
