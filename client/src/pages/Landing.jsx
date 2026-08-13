import { Link } from 'react-router';
import {
  ArrowRight,
  Brain,
  ClipboardList,
  FileText,
  Sparkles,
  Target,
  Upload,
  Zap,
} from 'lucide-react';
import Button from '../components/common/Button';

const features = [
  {
    icon: Target,
    title: 'Match Score Analysis',
    description:
      'Understand how well your resume aligns with a specific job description before you apply.',
  },
  {
    icon: Brain,
    title: 'Technical & Behavioral Prep',
    description:
      'Get tailored interview questions with intentions and suggested answers for your target role.',
  },
  {
    icon: ClipboardList,
    title: 'Skill-Gap Insights',
    description:
      'Identify gaps between your profile and the role, prioritized by severity.',
  },
  {
    icon: Zap,
    title: 'AI Preparation Plan',
    description:
      'Follow a structured day-by-day plan to strengthen weak areas before your interview.',
  },
  {
    icon: FileText,
    title: 'Tailored Resume PDF',
    description:
      'Generate a job-targeted resume PDF optimized for the role you are pursuing.',
  },
];

const steps = [
  {
    step: '01',
    title: 'Upload Resume',
    description:
      'Add your current resume as a PDF along with a brief self-description.',
  },
  {
    step: '02',
    title: 'Add Job Description',
    description:
      'Paste the job posting you are targeting for a focused analysis.',
  },
  {
    step: '03',
    title: 'Get AI Analysis',
    description:
      'Receive match score, questions, skill gaps, and a preparation plan.',
  },
  {
    step: '04',
    title: 'Download Resume',
    description:
      'Generate and download a tailored resume PDF for your application.',
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-200">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-semibold text-slate-900">
              Interview Prep AI
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Get started</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-indigo-50/80 to-white" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
              <Sparkles className="h-4 w-4" />
              AI-powered career preparation
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Turn your resume and job description into interview readiness
            </h1>
            <p className="mt-6 text-lg text-slate-600">
              Resume + Job Description → AI Analysis → Interview Preparation →
              Tailored Resume
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/register">
                <Button size="lg">
                  Start preparing
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" size="lg">
                  Sign in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">How it works</h2>
          <p className="mt-3 text-slate-600">
            Four steps from application to interview-ready
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(item => (
            <div
              key={item.step}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <span className="text-sm font-bold text-indigo-600">
                {item.step}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              Everything you need to prepare
            </h2>
            <p className="mt-3 text-slate-600">
              A focused toolkit for interview analysis and resume optimization
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-indigo-950 px-8 py-12 text-white sm:px-12">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">
                Ready to prepare for your next interview?
              </h2>
              <p className="mt-4 text-indigo-200">
                Upload your resume, paste a job description, and let AI guide
                your preparation.
              </p>
              <Link to="/register" className="mt-8 inline-block">
                <Button size="lg" variant="primary">
                  Create free account
                  <Upload className="h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="rounded-2xl border border-indigo-800 bg-indigo-900/50 p-6">
              <ul className="space-y-4 text-sm text-indigo-100">
                <li className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-indigo-300" />
                  Resume-job match scoring
                </li>
                <li className="flex items-center gap-3">
                  <Brain className="h-5 w-5 text-indigo-300" />
                  Technical & behavioral Q&A
                </li>
                <li className="flex items-center gap-3">
                  <ClipboardList className="h-5 w-5 text-indigo-300" />
                  Prioritized skill-gap analysis
                </li>
                <li className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-indigo-300" />
                  Tailored resume PDF download
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Interview Prep AI
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link to="/login" className="hover:text-slate-900">
              Log in
            </Link>
            <Link to="/register" className="hover:text-slate-900">
              Register
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
