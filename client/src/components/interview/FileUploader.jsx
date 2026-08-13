import { useRef, useState } from 'react';
import { FileText, Upload, X } from 'lucide-react';
import { ACCEPTED_RESUME_TYPE, MAX_RESUME_SIZE } from '../../constants';
import { formatFileSize } from '../../utils/format';
import Button from '../common/Button';

const FileUploader = ({ file, onFileChange, error }) => {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [localError, setLocalError] = useState('');

  const validateFile = selectedFile => {
    if (!selectedFile) return 'Please select a resume file.';
    if (selectedFile.type !== ACCEPTED_RESUME_TYPE) {
      return 'Resume must be a PDF file.';
    }
    if (selectedFile.size > MAX_RESUME_SIZE) {
      return 'Resume file exceeds the 3MB size limit.';
    }
    return '';
  };

  const handleFile = selectedFile => {
    const validationError = validateFile(selectedFile);
    if (validationError) {
      setLocalError(validationError);
      onFileChange(null);
      return;
    }
    setLocalError('');
    onFileChange(selectedFile);
  };

  const handleDrop = event => {
    event.preventDefault();
    setDragActive(false);
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) handleFile(droppedFile);
  };

  const displayError = error || localError;

  return (
    <div>
      <label
        htmlFor="resume-upload"
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        Resume (PDF)
      </label>

      {!file ? (
        <div
          onClick={() => inputRef.current?.click()}
          className={`relative cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
            dragActive
              ? 'border-indigo-400 bg-indigo-50/50'
              : displayError
                ? 'border-rose-300 bg-rose-50/30'
                : 'border-slate-200 bg-slate-50/50 hover:border-indigo-300'
          }`}
          onDragEnter={e => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={e => {
            e.preventDefault();
            setDragActive(false);
          }}
          onDragOver={e => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,application/pdf"
            className="sr-only"
            id="resume-upload"
            onChange={e => handleFile(e.target.files?.[0])}
          />
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            <Upload className="h-6 w-6" />
          </div>
          <p className="mt-4 text-sm font-medium text-slate-900">
            Drag and drop your resume, or{' '}
            <button
              type="button"
              className="cursor-pointer text-indigo-600 underline-offset-2 hover:underline"
              onClick={() => inputRef.current?.click()}
            >
              browse files
            </button>
          </p>
          <p className="mt-1 text-xs text-slate-500">PDF only, up to 3MB</p>
        </div>
      ) : (
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">{file.name}</p>
              <p className="text-xs text-slate-500">
                {formatFileSize(file.size)}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onFileChange(null);
              if (inputRef.current) inputRef.current.value = '';
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {displayError && (
        <p className="mt-1.5 text-sm text-rose-600" role="alert">
          {displayError}
        </p>
      )}
    </div>
  );
};

export default FileUploader;
