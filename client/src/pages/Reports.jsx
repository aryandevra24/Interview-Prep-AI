import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { FileText } from 'lucide-react';
import Alert from '../components/common/Alert';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import Skeleton from '../components/common/Skeleton';
import ReportCard from '../components/dashboard/ReportCard';
import PageHeader from '../components/layout/PageHeader';
import {
  fetchAllReports,
  generateResume,
  clearInterviewErrors,
} from '../features/interview/interviewSlice';

const Reports = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    reports,
    isLoadingReports,
    error,
    isGeneratingResume,
    generatingResumeId,
    resumeError,
  } = useSelector(state => state.interview);

  useEffect(() => {
    dispatch(fetchAllReports());
    return () => dispatch(clearInterviewErrors());
  }, [dispatch]);

  const handleGenerateResume = report => {
    dispatch(generateResume({ reportId: report._id, title: report.title }));
  };

  return (
    <div>
      <PageHeader
        title="Report History"
        description="Browse all your interview analyses and download tailored resumes."
        action={
          <Link to="/interview/new">
            <Button>New analysis</Button>
          </Link>
        }
      />

      {(error || resumeError) && (
        <Alert variant="error" className="mb-6">
          {error || resumeError}
        </Alert>
      )}

      {isLoadingReports ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      ) : reports.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No interview analyses yet"
          description="Create your first analysis by uploading your resume and adding a target job description."
          actionLabel="Create first analysis"
          onAction={() => navigate('/interview/new')}
        />
      ) : (
        <div className="space-y-4">
          {reports.map(report => (
            <ReportCard
              key={report._id}
              report={report}
              onGenerateResume={handleGenerateResume}
              isGeneratingResume={
                isGeneratingResume && generatingResumeId === report._id
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Reports;
