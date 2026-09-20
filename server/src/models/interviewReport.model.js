import mongoose from 'mongoose';

const technicalQuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: [true, 'question is required'] },
    intention: { type: String, required: [true, 'intention is required'] },
    answer: { type: String, required: [true, 'answer is required'] },
  },
  {
    _id: false,
  }
);

const behavioralQuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: [true, 'question is required'] },
    intention: { type: String, required: [true, 'intention is required'] },
    answer: { type: String, required: [true, 'answer is required'] },
  },
  {
    _id: false,
  }
);

const skillGapSchema = new mongoose.Schema(
  {
    skill: { type: String, required: [true, 'skill is required'] },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true,
    },
  },
  {
    _id: false,
  }
);

const preparationPlanSchema = new mongoose.Schema(
  {
    day: { type: Number, required: [true, 'day is required'] },
    focus: { type: String, required: [true, 'focus is required'] },
    task: [{ type: String, required: [true, 'task is required'] }],
  },
  {
    _id: false,
  }
);

const interviewReportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'user is required'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'job title is required'],
    },
    jobDescription: {
      type: String,
      required: [true, 'job description is required'],
      minLength: [50, 'job description must be at least 30 characters long'],
    },
    matchScore: { type: Number, required: true, min: 0, max: 100 },
    resumeTxt: { type: String, required: [true, 'resume txt is required'] },
    selfDescription: {
      type: String,
      required: [true, 'self description is required'],
      minLength: [50, 'self description must be at least 50 characters long'],
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
  },
  { timestamps: true }
);

const InterviewReport = mongoose.model(
  'InterviewReport',
  interviewReportSchema
);
export default InterviewReport;
