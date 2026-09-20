import env from '../config/env.js';
import { GoogleGenAI } from '@google/genai';
import * as z from 'zod';
import {
  buildInterviewReportPrompt,
  buildResumePdfPrompt,
  buildSkillQuizPrompt,
} from '../prompts/interview.prompts.js';
import { ApiError } from '../utils/apiError.js';

const client = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

export const generateInterviewReport = async ({
  resumeTxt,
  selfDescription,
  jobDescription,
}) => {
  const interviewReportJsonSchema = {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        description:
          'The title of the job for which the interview report is generated.',
      },
      matchScore: {
        type: 'integer',
        minimum: 0,
        maximum: 100,
        description:
          "A score between 0 and 100 indicating how well the candidate's profile matches the job describe.",
      },
      technicalQuestions: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            question: {
              type: 'string',
              description:
                'The technical question can be asked in the interview.',
            },
            intention: {
              type: 'string',
              description:
                'The intention of interviewer behind asking this question.',
            },
            answer: {
              type: 'string',
              description:
                'How to answer this question, what points to cover, what approach to take and etc.',
            },
          },
          required: ['question', 'intention', 'answer'],
        },
        description:
          'Technical questions that can be asked in the interview along with their intention and how to answer them.',
      },
      behavioralQuestions: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            question: {
              type: 'string',
              description:
                'The behavioural question can be asked in the interview.',
            },
            intention: {
              type: 'string',
              description:
                'The intention of interviewer behind asking this question.',
            },
            answer: {
              type: 'string',
              description:
                'How to answer this question, what points to cover, what approach to take and etc.',
            },
          },
          required: ['question', 'intention', 'answer'],
        },
        description:
          'Behavioral questions that can be asked in the interview along with their intention and how to answer them.',
      },
      skillGaps: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            skill: {
              type: 'string',
              description: 'The skill which the candidate is lacking.',
            },
            severity: {
              type: 'string',
              enum: ['low', 'medium', 'high'],
              description:
                "The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances.",
            },
          },
          required: ['skill', 'severity'],
        },
        description:
          'Identified skill gaps from the resume and job description comparison.',
      },
      preparationPlan: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            day: {
              type: 'integer',
              description: 'Day number of the preparation plan.',
            },
            focus: {
              type: 'string',
              description: 'Main focus topic for the day.',
            },
            task: {
              type: 'array',
              items: { type: 'string' },
              description: 'List of actionable tasks for the day.',
            },
          },
          required: ['day', 'focus', 'task'],
        },
        description:
          'A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively.',
      },
    },
    required: [
      'title',
      'matchScore',
      'technicalQuestions',
      'behavioralQuestions',
      'skillGaps',
      'preparationPlan',
    ],
  };

  try {
    const interviewReportSchema = z.fromJSONSchema(interviewReportJsonSchema);
    const prompt = buildInterviewReportPrompt({
      resumeTxt,
      selfDescription,
      jobDescription,
    });

    const interaction = await client.interactions.create({
      model: 'gemini-3.1-flash-lite',
      input: prompt,
      response_format: {
        type: 'text',
        mime_type: 'application/json',
        schema: interviewReportJsonSchema,
      },
    });

    return interviewReportSchema.parse(JSON.parse(interaction.output_text));
  } catch (error) {
    throw new ApiError(502, 'Unable to generate interview report.');
  }
};

export const generateSkillQuiz = async ({ skill, level }) => {
  const skillQuizJsonSchema = {
    type: 'object',
    properties: {
      questions: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            question: {
              type: 'string',
            },
            options: {
              type: 'array',
              items: {
                type: 'string',
              },
              minItems: 4,
              maxItems: 4,
            },
            correctIndex: {
              type: 'integer',
              minimum: 0,
              maximum: 3,
            },
            topic: {
              type: 'string',
            },
            explanation: {
              type: 'string',
            },
          },
          required: [
            'question',
            'options',
            'correctIndex',
            'topic',
            'explanation',
          ],
        },
        minItems: 20,
        maxItems: 20,
      },
    },
    required: ['questions'],
  };

  try {
    const skillQuizSchema = z.fromJSONSchema(skillQuizJsonSchema);

    const prompt = buildSkillQuizPrompt({
      skill,
      level,
    });

    const interaction = await client.interactions.create({
      model: 'gemini-3.1-flash-lite',
      input: prompt,
      response_format: {
        type: 'text',
        mime_type: 'application/json',
        schema: skillQuizJsonSchema,
      },
    });

    const parsed = skillQuizSchema.parse(JSON.parse(interaction.output_text));

    return parsed.questions;
  } catch (error) {
    console.error('[Skill Quiz Generation Error]', {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
    });

    throw new ApiError(502, 'Unable to generate skill quiz questions.');
  }
};

export const generateResumeHtml = async ({
  resumeTxt,
  selfDescription,
  jobDescription,
}) => {
  const resumeHtmlJsonSchema = {
    type: 'object',
    properties: {
      resumePdfHtml: {
        type: 'string',
        description:
          'The HTML content of the resume which can be converted to PDF using any library like puppeteer.',
      },
    },
    required: ['resumePdfHtml'],
  };

  try {
    const resumeHtmlSchema = z.fromJSONSchema(resumeHtmlJsonSchema);
    const prompt = buildResumePdfPrompt({
      resumeTxt,
      selfDescription,
      jobDescription,
    });

    const interaction = await client.interactions.create({
      model: 'gemini-3.1-flash-lite',
      input: prompt,
      response_format: {
        type: 'text',
        mime_type: 'application/json',
        schema: resumeHtmlJsonSchema,
      },
    });

    return resumeHtmlSchema.parse(JSON.parse(interaction.output_text))
      .resumePdfHtml;
  } catch (error) {
    throw new ApiError(502, 'Unable to generate resume.');
  }
};
