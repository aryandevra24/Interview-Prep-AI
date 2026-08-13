import { Link } from 'react-router';
import { ArrowRight, FileDown } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { formatDate } from '../../utils/format';

const ReportCard = ({ report, onGenerateResume, isGeneratingResume }) => {
  const scoreColor =
    report.matchScore >= 75
      ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
      : report.matchScore >= 50
        ? 'bg-amber-50 text-amber-700 ring-amber-600/20'
        : 'bg-rose-50 text-rose-700 ring-rose-600/20';

  return (
    <Card className="transition-shadow hover:shadow-md" padding="p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-base font-semibold text-slate-900">
              {report.title}
            </h3>
            <Badge className={scoreColor}>{report.matchScore}% match</Badge>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            {formatDate(report.createdAt)}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <Button
            variant="secondary"
            size="sm"
            isLoading={isGeneratingResume}
            onClick={() => onGenerateResume(report)}
          >
            <FileDown className="h-4 w-4" />
            Resume
          </Button>
          <Link to={`/reports/${report._id}`}>
            <Button variant="primary" size="sm">
              View
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ReportCard;
