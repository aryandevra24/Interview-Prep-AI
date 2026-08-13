import { CalendarDays, CheckCircle2 } from 'lucide-react';
import Card from '../common/Card';

const PreparationDay = ({ day, focus, task = [] }) => {
  return (
    <Card padding="p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
          <CalendarDays className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-indigo-600 uppercase">
            Day {day}
          </p>
          <h4 className="mt-1 text-base font-semibold text-slate-900">
            {focus}
          </h4>
          <ul className="mt-4 space-y-2">
            {task.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-slate-600"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default PreparationDay;
