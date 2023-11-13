import { Request, Response } from 'express';
import SoftwareEngineerApplicationModel from '../models/applicant.model';

export const createApplication = async (req: Request, res: Response) => {
  try {
    const application = await SoftwareEngineerApplicationModel.create(req.body);
    return res.status(201).json(application);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



