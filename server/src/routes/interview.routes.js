import { Router } from 'express';
import { authUser } from '../middlewares/auth.middleware.js';
import {
  generateInterViewReportController,
  generateResumePdfController,
  getAllInterviewReportsController,
  getInterviewReportByIdController,
} from '../controllers/interview.controller.js';
import upload from '../middlewares/file.middleware.js';

const interviewRouter = Router();

/**
 * @route   POST /api/v1/interview
 * @desc    Generate interview report expecting user self description, resume and job description
 * @access  Private
 */
interviewRouter.post(
  '/',
  authUser,
  upload.single('resume'),
  generateInterViewReportController
);

/**
 * @route   GET /api/v1/interview/report/all
 * @desc    Get all interview reports
 * @access  Private
 */
interviewRouter.get('/report/all', authUser, getAllInterviewReportsController);

/**
 * @route   GET /api/v1/interview/report/:interviewReportId
 * @desc    Get interview report by id
 * @access  Private
 */
interviewRouter.get(
  '/report/:interviewReportId',
  authUser,
  getInterviewReportByIdController
);

/**
 * @route   POST /api/v1/interview/resume/:interviewReportId
 * @desc    Get resume by interview report id
 * @access  Private
 */
interviewRouter.get(
  '/resume/:interviewReportId',
  authUser,
  generateResumePdfController
);

export default interviewRouter;
