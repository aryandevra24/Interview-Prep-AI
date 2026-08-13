const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 lg:flex-row">
      <div className="hidden flex-1 flex-col justify-between bg-indigo-950 p-10 text-white lg:flex">
        <div className="mt-[15vh] space-y-10">
          <p className="text-sm font-semibold tracking-wider text-indigo-300 uppercase">
            Interview Prep AI
          </p>
          <h1 className="mt-6 max-w-md text-4xl leading-tight font-bold">
            Prepare smarter. Interview with confidence.
          </h1>
          <p className="mt-4 max-w-md text-indigo-200">
            Upload your resume, add a job description, and get AI-powered
            interview prep, skill-gap analysis, and a tailored resume.
          </p>
        </div>
        <p className="text-sm text-indigo-300">
          Resume + Job Description → AI Analysis → Interview Prep → Tailored
          Resume
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <p className="text-sm font-semibold tracking-wider text-indigo-600 uppercase">
              Interview Prep AI
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
              {subtitle && (
                <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
              )}
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
