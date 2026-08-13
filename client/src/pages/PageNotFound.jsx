import { Link } from 'react-router';
import { ArrowLeft, Home, SearchX } from 'lucide-react';
import Button from '../components/common/Button';

const PageNotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
          <SearchX className="h-8 w-8 text-indigo-600" />
        </div>

        <p className="mb-2 text-sm font-semibold tracking-wider text-indigo-600 uppercase">
          Error 404
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Page not found
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-500">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved. Let&apos;s get you back to your interview preparation.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/" replace>
            <Button size="lg">
              <Home className="h-4 w-4" />
              Go to Home
            </Button>
          </Link>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </main>
  );
};

export default PageNotFound;
