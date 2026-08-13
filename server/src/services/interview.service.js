import mongoose from 'mongoose';
import InterviewReport from '../models/interviewReport.model.js';
import { generateInterviewReport } from './ai.service.js';

export const createInterviewReport = async ({
  userId,
  resumeTxt,
  selfDescription,
  jobDescription,
}) => {
  const interviewReportByAi = await generateInterviewReport({
    resumeTxt,
    selfDescription,
    jobDescription,
  });

  return InterviewReport.create({
    user: userId,
    resumeTxt,
    selfDescription,
    jobDescription,
    ...interviewReportByAi,
  });
};

export const getInterviewReportById = async ({ interviewReportId, userId }) => {
  if (!mongoose.isValidObjectId(interviewReportId)) {
    return null;
  }

  return InterviewReport.findOne({ _id: interviewReportId, user: userId });
};

export const getAllInterviewReports = async userId => {
  return InterviewReport.find({ user: userId })
    .sort({ createdAt: -1 })
    .select('title matchScore createdAt updatedAt');
};
