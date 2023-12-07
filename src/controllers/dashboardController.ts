import { Request, Response } from "express";
import { Job, JobApplicant, ProgramApplicant } from "../models";

class DashboardController {
  static async dashContent(req: Request, res: Response): Promise<void> {
    // For Program Applicants
    const acceptedProgramApplicants = await ProgramApplicant.count({ where: { status: 'accepted' } });
    const rejectedProgramApplicants = await ProgramApplicant.count({ where: { status: 'rejected' } });
    const pendingProgramApplicants = await ProgramApplicant.count({ where: { status: 'pending' } });

    // For Job Applicants
    const acceptedJobApplicants = await JobApplicant.count({ where: { status: 'accepted' } });
    const rejectedJobApplicants = await JobApplicant.count({ where: { status: 'rejected' } });
    const pendingJobApplicants = await JobApplicant.count({ where: { status: 'pending' } });

    const totalProgramApplicants = await ProgramApplicant.count();
    const totalJobApplicants = await JobApplicant.count();

    // count program applicants based on experience
    const lessThanOneYear = await ProgramApplicant.count({ where: { yearsOfExperience: 'Less than a year' } });
    const oneToTwoYears = await ProgramApplicant.count({ where: { yearsOfExperience: '1 - 2 years' } });
    const aboveTwoYears = await ProgramApplicant.count({ where: { yearsOfExperience: 'Above 2 years' } });

    // get 3 recent program applicants
    const recentProgramApplicants = await ProgramApplicant.findAll({ limit: 3, order: [['createdAt', 'DESC']] });
    // get 3 recent job applicants
    const recentJobApplicants = await JobApplicant.findAll({ limit: 3, order: [['createdAt', 'DESC']] });
    // get 3 recent job openings
    const recentJobOpenings = await Job.findAll({ limit: 3, order: [['createdAt', 'DESC']] });

    res.status(200).json({
      status: 'success',
      data: {
        acceptedProgramApplicants,
        rejectedProgramApplicants,
        pendingProgramApplicants,
        acceptedJobApplicants,
        rejectedJobApplicants,
        pendingJobApplicants,
        totalProgramApplicants,
        totalJobApplicants,
        lessThanOneYear,
        oneToTwoYears,
        aboveTwoYears,
        recentProgramApplicants,
        recentJobApplicants,
        recentJobOpenings
      }
    });
    return;
  }
}

export default DashboardController;