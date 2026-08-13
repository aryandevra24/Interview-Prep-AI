import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router';
import {
  ArrowLeft,
  Brain,
  CalendarDays,
  FileDown,
  MessageSquare,
  Target,
} from 'lucide-react';
import Alert from '../components/common/Alert';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import EmptyState from '../components/common/EmptyState';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Skeleton from '../components/common/Skeleton';
import PreparationDay from '../components/report/PreparationDay';
import QuestionCard from '../components/report/QuestionCard';
import ScoreGauge from '../components/report/ScoreGauge';
import SkillGapCard from '../components/report/SkillGapCard';
import {
  clearInterviewErrors,
  clearSelectedReport,
  fetchReportById,
  generateResume,
} from '../features/interview/interviewSlice';
import { formatDateTime } from '../utils/format';

const InterviewReport = () => {
  const { reportId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    selectedReport: report,
    isLoadingReport,
    error,
    isGeneratingResume,
    resumeError,
  } = useSelector(state => state.interview);

  // State to keep track of the currently open question ID (e.g., 'tech-0' or 'behav-1')
  const [openQuestionId, setOpenQuestionId] = useState(null);

  useEffect(() => {
    dispatch(fetchReportById(reportId));
    return () => {
      dispatch(clearSelectedReport());
      dispatch(clearInterviewErrors());
    };
  }, [dispatch, reportId]);

  const handleGenerateResume = () => {
    if (!report) return;
    dispatch(generateResume({ reportId: report._id, title: report.title }));
  };

  if (isLoadingReport) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-48 w-full" />
        <div className="grid gap-4 lg:grid-cols-2">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
        <LoadingSpinner className="py-8" />
      </div>
    );
  }

  if (error || !report) {
    return (
      <div>
        <Link
          to="/reports"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to reports
        </Link>
        <EmptyState
          icon={Target}
          title={error || 'Report not found'}
          description="This report may have been removed or you may not have access to it."
          onAction={() => navigate('/reports')}
        />
      </div>
    );
  }

  const jobSummary =
    report.jobDescription?.length > 300
      ? `${report.jobDescription.slice(0, 300)}...`
      : report.jobDescription;

  return (
    <div className="space-y-8">
      <div>
        <Link
          to="/reports"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to reports
        </Link>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              {report.title}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Generated {formatDateTime(report.createdAt)}
            </p>
            {jobSummary && (
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
                {jobSummary}
              </p>
            )}
          </div>

          <Button
            variant="secondary"
            isLoading={isGeneratingResume}
            onClick={handleGenerateResume}
            className="shrink-0"
          >
            <FileDown className="h-4 w-4" />
            Generate tailored resume
          </Button>
        </div>

        {resumeError && (
          <Alert variant="error" className="mt-4">
            {resumeError}
          </Alert>
        )}
      </div>

      <Card className="flex justify-center py-8">
        <ScoreGauge score={report.matchScore} />
      </Card>

      <section>
        <div className="mb-4 flex items-center gap-2">
          <Brain className="h-5 w-5 text-indigo-600" />
          <h2 className="text-xl font-semibold text-slate-900">
            Technical Questions
          </h2>
          <span className="text-sm text-slate-500">
            ({report.technicalQuestions?.length || 0})
          </span>
        </div>
        {report.technicalQuestions?.length > 0 ? (
          <div className="space-y-3">
            {report.technicalQuestions.map((item, index) => {
              const uniqueId = `tech-${index}`;
              return (
                <QuestionCard
                  key={uniqueId}
                  question={item.question}
                  intention={item.intention}
                  answer={item.answer}
                  variant="technical"
                  isOpen={openQuestionId === uniqueId}
                  onToggle={() =>
                    setOpenQuestionId(
                      openQuestionId === uniqueId ? null : uniqueId
                    )
                  }
                />
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            No technical questions in this report.
          </p>
        )}
      </section>

      <section>
        <div className="mb-4 flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-violet-600" />
          <h2 className="text-xl font-semibold text-slate-900">
            Behavioral Questions
          </h2>
          <span className="text-sm text-slate-500">
            ({report.behavioralQuestions?.length || 0})
          </span>
        </div>
        {report.behavioralQuestions?.length > 0 ? (
          <div className="space-y-3">
            {report.behavioralQuestions.map((item, index) => {
              const uniqueId = `behav-${index}`;
              return (
                <QuestionCard
                  key={uniqueId}
                  question={item.question}
                  intention={item.intention}
                  answer={item.answer}
                  variant="behavioral"
                  isOpen={openQuestionId === uniqueId}
                  onToggle={() =>
                    setOpenQuestionId(
                      openQuestionId === uniqueId ? null : uniqueId
                    )
                  }
                />
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            No behavioral questions in this report.
          </p>
        )}
      </section>

      <section>
        <div className="mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-rose-600" />
          <h2 className="text-xl font-semibold text-slate-900">Skill Gaps</h2>
          <span className="text-sm text-slate-500">
            ({report.skillGaps?.length || 0})
          </span>
        </div>
        {report.skillGaps?.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {report.skillGaps.map((gap, index) => (
              <SkillGapCard
                key={index}
                skill={gap.skill}
                severity={gap.severity}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            No skill gaps identified in this report.
          </p>
        )}
      </section>

      <section>
        <div className="mb-4 flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-emerald-600" />
          <h2 className="text-xl font-semibold text-slate-900">
            Preparation Plan
          </h2>
          <span className="text-sm text-slate-500">
            ({report.preparationPlan?.length || 0} days)
          </span>
        </div>
        {report.preparationPlan?.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {report.preparationPlan.map(day => (
              <PreparationDay
                key={day.day}
                day={day.day}
                focus={day.focus}
                task={day.task}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            No preparation plan in this report.
          </p>
        )}
      </section>
    </div>
  );
};

export default InterviewReport;
