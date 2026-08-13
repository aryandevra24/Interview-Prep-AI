const Textarea = ({
  id,
  label,
  error,
  hint,
  className = '',
  rows = 4,
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={`block w-full resize-y rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none ${
          error ? 'border-rose-300' : 'border-slate-200'
        }`}
        {...props}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-slate-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default Textarea;
