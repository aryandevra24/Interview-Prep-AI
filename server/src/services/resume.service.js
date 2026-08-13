import { PDFParse } from 'pdf-parse';
import { generateResumeHtml } from './ai.service.js';
import { generatePdfFromHtml } from './pdf.service.js';
import { ApiError } from '../utils/apiError.js';

export const extractResumeText = async resumeBuffer => {
  try {
    return (await new PDFParse({ data: resumeBuffer }).getText()).text;
  } catch (error) {
    throw new ApiError(400, 'Unable to parse resume PDF.');
  }
};

export const generateResumePdf = async ({
  resumeTxt,
  selfDescription,
  jobDescription,
}) => {
  const resumeHtml = await generateResumeHtml({
    resumeTxt,
    selfDescription,
    jobDescription,
  });

  return generatePdfFromHtml(resumeHtml);
};
