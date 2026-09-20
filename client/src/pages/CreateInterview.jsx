import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Sparkles } from 'lucide-react';
import Alert from '../components/common/Alert';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Textarea from '../components/common/Textarea';
import FileUploader from '../components/interview/FileUploader';
import PageHeader from '../components/layout/PageHeader';
import {
  createReport,
  clearInterviewErrors,
} from '../features/interview/interviewSlice';

const MIN_DESCRIPTION_LENGTH = 20;
const MIN_JOB_DESCRIPTION_LENGTH = 50;

const CreateInterview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isCreating, createError } = useSelector(state => state.interview);

  const [resume, setResume] = useState(null);
  const [selfDescription, setSelfDescription] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (!resume) errors.resume = 'Please upload your resume as a PDF.';

    if (!selfDescription.trim()) {
      errors.selfDescription = 'Self description is required.';
    } else if (selfDescription.trim().length < MIN_DESCRIPTION_LENGTH) {
      errors.selfDescription = `Self description must be at least ${MIN_DESCRIPTION_LENGTH} characters long.`;
    }

    if (!jobDescription.trim()) {
      errors.jobDescription = 'Job description is required.';
    } else if (jobDescription.trim().length < MIN_JOB_DESCRIPTION_LENGTH) {
      errors.jobDescription = `Job description must be at least ${MIN_JOB_DESCRIPTION_LENGTH} characters long.`;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch(clearInterviewErrors());
    if (!validate()) return;

    const result = await dispatch(
      createReport({
        resume,
        selfDescription: selfDescription.trim(),
        jobDescription: jobDescription.trim(),
      })
    );

    if (createReport.fulfilled.match(result)) {
      navigate(`/reports/${result.payload._id}`);
    }
  };

  return (
    <div>
      <PageHeader
        title="New Interview Analysis"
        description="Upload your resume, describe yourself, and paste the job description to generate a tailored preparation report."
      />

      {createError && (
        <Alert variant="error" className="mb-6">
          {createError}
        </Alert>
      )}

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <FileUploader
            file={resume}
            onFileChange={setResume}
            error={validationErrors.resume}
          />

          <Textarea
            id="selfDescription"
            label="Self description"
            rows={4}
            value={selfDescription}
            onChange={e => setSelfDescription(e.target.value)}
            error={validationErrors.selfDescription}
            hint="Briefly describe your background, experience, and career goals."
            placeholder="I am a software engineer with 3 years of experience in React and Node.js..."
          />

          <Textarea
            id="jobDescription"
            label="Job description"
            rows={10}
            value={jobDescription}
            onChange={e => setJobDescription(e.target.value)}
            error={validationErrors.jobDescription}
            hint="Paste the full job posting for the most accurate analysis."
            placeholder="Paste the complete job description here..."
          />

          <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
            <Button
              type="submit"
              size="lg"
              isLoading={isCreating}
              disabled={isCreating}
            >
              <Sparkles className="h-4 w-4" />
              {isCreating ? 'Generating analysis...' : 'Generate analysis'}
            </Button>
          </div>

          {isCreating && (
            <Alert variant="info">
              AI is analyzing your resume and job description. This may take a
              minute.
            </Alert>
          )}
        </form>
      </Card>
    </div>
  );
};

export default CreateInterview;
