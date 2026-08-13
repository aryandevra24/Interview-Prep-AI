import {
  extractResumeText,
  generateResumePdf,
} from '../services/resume.service.js';
import {
  createInterviewReport,
  getAllInterviewReports,
  getInterviewReportById,
} from '../services/interview.service.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../middlewares/asyncHandler.middleware.js';
import { sendSuccess } from '../utils/apiResponse.js';

/**
 * @name generateInterViewReportController
 * @desc Generate interview report expecting user self description, resume and job description
 * @route POST /api/v1/interview
 * @access Private
 */
export const generateInterViewReportController = asyncHandler(
  async (req, res) => {
    const resume = req.file;
    const { selfDescription, jobDescription } = req.body;

    if (!resume || !selfDescription || !jobDescription) {
      throw new ApiError(
        400,
        'resume, selfDescription and jobDescription are required.'
      );
    }

    if (resume.mimetype !== 'application/pdf') {
      throw new ApiError(400, 'resume must be a PDF file.');
    }

    const resumeTxt = await extractResumeText(resume.buffer);
    const interviewReport = await createInterviewReport({
      userId: req.user._id,
      resumeTxt,
      selfDescription,
      jobDescription,
    });

    return sendSuccess(res, {
      statusCode: 201,
      message: 'Interview report generated successfully.',
      data: { interviewReport },
    });
  }
);

/**
 * @name getInterviewReportByIdController
 * @desc fetched interview report by id
 * @route GET /api/v1/interview/report/:interviewReportId
 * @access Private
 */
export const getInterviewReportByIdController = asyncHandler(
  async (req, res) => {
    const { interviewReportId } = req.params;

    const interviewReport = await getInterviewReportById({
      interviewReportId,
      userId: req.user._id,
    });

    if (!interviewReport) {
      throw new ApiError(404, 'Interview report not found.');
    }

    return sendSuccess(res, {
      message: 'Interview report fetched successfully.',
      data: { interviewReport },
    });
  }
);

export const getAllInterviewReportsController = asyncHandler(
  async (req, res) => {
    const interviewReports = await getAllInterviewReports(req.user._id);

    return sendSuccess(res, {
      message: 'Interview reports fetched successfully.',
      data: { interviewReports },
    });
  }
);

export const generateResumePdfController = asyncHandler(async (req, res) => {
  const { interviewReportId } = req.params;

  const interviewReport = await getInterviewReportById({
    interviewReportId,
    userId: req.user._id,
  });

  if (!interviewReport) {
    throw new ApiError(404, 'Interview report not found.');
  }

  const { resumeTxt, jobDescription, selfDescription } = interviewReport;

  const pdfBuffer = await generateResumePdf({
    resumeTxt,
    jobDescription,
    selfDescription,
  });

  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename=resume_${interviewReport.title}.pdf`,
  });

  res.send(pdfBuffer);
});
