import { ChevronDown } from 'lucide-react';

const QuestionCard = ({
  question,
  intention,
  answer,
  variant = 'technical',
  isOpen = false,
  onToggle,
}) => {
  const accent =
    variant === 'technical'
      ? 'border-l-indigo-500 bg-indigo-50/30'
      : 'border-l-violet-500 bg-violet-50/30';

  return (
    <div
      className={`overflow-hidden rounded-xl border border-l-4 border-slate-200 ${accent}`}
    >
      <button
        type="button"
        className="flex w-full cursor-pointer items-start justify-between gap-4 p-5 text-left transition-colors hover:bg-white/60"
        onClick={onToggle}
      >
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900">{question}</p>
          <p className="mt-1 text-xs text-slate-500">
            <span className="font-medium">Intention:</span> {intention}
          </p>
        </div>
        <ChevronDown
          className={`mt-0.5 h-5 w-5 shrink-0 text-slate-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="border-t border-slate-100 bg-white px-5 py-4">
          <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
            Answer Strategy
          </p>
          <p className="mt-2 text-sm leading-relaxed whitespace-pre-wrap text-slate-700">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
