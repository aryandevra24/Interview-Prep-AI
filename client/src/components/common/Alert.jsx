import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react';

const variants = {
  error: {
    icon: XCircle,
    classes: 'border-rose-200 bg-rose-50 text-rose-800',
    iconClass: 'text-rose-500',
  },
  success: {
    icon: CheckCircle2,
    classes: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    iconClass: 'text-emerald-500',
  },
  warning: {
    icon: AlertCircle,
    classes: 'border-amber-200 bg-amber-50 text-amber-800',
    iconClass: 'text-amber-500',
  },
  info: {
    icon: Info,
    classes: 'border-indigo-200 bg-indigo-50 text-indigo-800',
    iconClass: 'text-indigo-500',
  },
};

const Alert = ({ variant = 'info', title, children, className = '' }) => {
  const config = variants[variant];
  const Icon = config.icon;

  return (
    <div
      className={`flex gap-3 rounded-lg border p-4 ${config.classes} ${variant === 'info' ? 'analysis-alert' : ''} ${className}`}
    >
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${config.iconClass}`} />
      <div>
        {title && <p className="font-medium">{title}</p>}
        {children && (
          <p className={`text-sm ${title ? 'mt-1' : ''}`}>{children}</p>
        )}
      </div>
    </div>
  );
};

export default Alert;
