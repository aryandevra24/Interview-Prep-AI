import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { FileText, PlusCircle, TrendingUp } from 'lucide-react';
import Alert from '../components/common/Alert';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import EmptyState from '../components/common/EmptyState';
import Skeleton from '../components/common/Skeleton';
import ReportCard from '../components/dashboard/ReportCard';
import PageHeader from '../components/layout/PageHeader';
import {
  fetchAllReports,
  generateResume,
  clearInterviewErrors,
} from '../features/interview/interviewSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
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

  const totalReports = reports.length;
  const latestReport = reports[0];
  const averageScore =
    totalReports > 0
      ? Math.round(
          reports.reduce((sum, r) => sum + r.matchScore, 0) / totalReports
        )
      : null;

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${user?.name?.split(' ')[0] || 'there'}`}
        description="Track your interview analyses and jump back into preparation."
        action={
          <Link to="/interview/new">
            <Button>
              <PlusCircle className="h-4 w-4" />
              New Interview
            </Button>
          </Link>
        }
      />

      {(error || resumeError) && (
        <Alert variant="error" className="mb-6">
          {error || resumeError}
        </Alert>
      )}

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total analyses</p>
              {isLoadingReports ? (
                <Skeleton className="mt-1 h-7 w-12" />
              ) : (
                <p className="text-2xl font-bold text-slate-900">
                  {totalReports}
                </p>
              )}
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Latest match score</p>
              {isLoadingReports ? (
                <Skeleton className="mt-1 h-7 w-16" />
              ) : (
                <p className="text-2xl font-bold text-slate-900">
                  {latestReport ? `${latestReport.matchScore}%` : '—'}
                </p>
              )}
            </div>
          </div>
        </Card>

        <Card className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Average match score</p>
              {isLoadingReports ? (
                <Skeleton className="mt-1 h-7 w-16" />
              ) : (
                <p className="text-2xl font-bold text-slate-900">
                  {averageScore !== null ? `${averageScore}%` : '—'}
                </p>
              )}
            </div>
          </div>
        </Card>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Recent analyses
          </h2>
          {totalReports > 0 && (
            <Link
              to="/reports"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              View all
            </Link>
          )}
        </div>

        {isLoadingReports ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        ) : totalReports === 0 ? (
          <EmptyState
            icon={FileText}
            title="No interview analyses yet"
            description="Create your first analysis by uploading your resume and adding a target job description."
            actionLabel="Create first analysis"
            onAction={() => navigate('/interview/new')}
          />
        ) : (
          <div className="space-y-4">
            {reports.slice(0, 5).map(report => (
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
    </div>
  );
};

export default Dashboard;
