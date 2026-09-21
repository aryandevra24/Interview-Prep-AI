import { useState } from 'react';
import { AlertCircle, BrainCircuit, RefreshCcw, Target } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import PageHeader from '../components/layout/PageHeader';
import apiClient from '../api/axios';
import { useEffect } from 'react';

const skillOptions = [
  // Frontend & UI
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Vue.js',
  'Angular',
  'Next.js',
  'Nuxt.js',
  'Svelte',
  'Tailwind CSS',
  'Sass/SCSS',
  'Bootstrap',
  'Redux',
  'Zustand',

  // Backend & APIs
  'Node.js',
  'Express.js',
  'Python',
  'Django',
  'FastAPI',
  'Flask',
  'Java',
  'Spring Boot',
  'C++',
  'C#',
  '.NET',
  'Go',
  'Rust',
  'Ruby on Rails',
  'PHP',
  'Laravel',
  'GraphQL',
  'REST API',
  'gRPC',

  // Databases & Caching
  'SQL',
  'PostgreSQL',
  'MySQL',
  'SQLite',
  'MongoDB',
  'Redis',
  'Firebase',
  'Supabase',
  'DynamoDB',
  'Prisma',
  'Sequelize',

  // DevOps, Cloud & Tools
  'Git',
  'GitHub Actions',
  'Docker',
  'Kubernetes',
  'AWS',
  'Google Cloud Platform',
  'Microsoft Azure',
  'Terraform',
  'Nginx',
  'Linux/Unix',
  'CI/CD',

  // Testing & Quality
  'Jest',
  'Mocha',
  'Cypress',
  'Playwright',
  'Selenium',
  'Vitest',

  // Mobile & Desktop
  'React Native',
  'Flutter',
  'Swift',
  'Kotlin',
  'Electron',

  // AI & Data Science
  'Machine Learning',
  'Deep Learning',
  'TensorFlow',
  'PyTorch',
  'Pandas',
  'NumPy',
  'LangChain',
  'OpenAI API',

  // Methodologies & Concepts
  'Agile/Scrum',
  'Microservices',
  'Serverless',
  'WebSockets',
  'UI/UX Design',
  'Figma',
];

const levelOptions = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const SkillQuiz = () => {
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('beginner');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (submitted) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [submitted]);

  const handleGenerateQuiz = async () => {
    setLoading(true);
    setError('');

    try {
      const { data } = await apiClient.post('/interview/skill-quiz', {
        skill: selectedSkill,
        level: selectedLevel,
      });

      setQuestions(data.data.questions || []);
      setAnswers({});
      setSubmitted(false);
      setStarted(true);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          'Unable to generate quiz questions right now. Please try again.'
      );
      setQuestions([]);
      setStarted(false);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    if (!started) return;
    setAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const score = questions.reduce((total, question, questionIndex) => {
    return total + (answers[questionIndex] === question.correctIndex ? 1 : 0);
  }, 0);

  const totalQuestions = questions.length;
  const percentage = totalQuestions
    ? Math.round((score / totalQuestions) * 100)
    : 0;

  const getLevelLabel = () => {
    if (percentage >= 75) return 'Level 3: Advanced';
    if (percentage >= 45) return 'Level 2: Intermediate';
    return 'Level 1: Foundation';
  };

  const answeredCount = Object.keys(answers).length;
  const isReadyToSubmit =
    answeredCount === questions.length && questions.length > 0;

  const handleSubmitAnswers = () => {
    if (!isReadyToSubmit) return;
    setSubmitted(true);
  };

  const weakTopics = questions.reduce((acc, question, index) => {
    if (
      submitted &&
      answers[index] !== undefined &&
      answers[index] !== question.correctIndex
    ) {
      acc[question.topic] = (acc[question.topic] || 0) + 1;
    }
    return acc;
  }, {});

  const focusAreas = Object.entries(weakTopics)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const resetQuiz = () => {
    setQuestions([]);
    setAnswers({});
    setSubmitted(false);
    setStarted(false);
    setError('');
  };

  return (
    <div>
      <PageHeader
        title="Skill interview practice"
        description="Choose a skill, select a level, generate 20 tailored questions, and review your strengths plus the areas to improve."
      />

      {!started || questions.length === 0 ? (
        <Card>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="skill"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Select skill
              </label>
              <select
                id="skill"
                value={selectedSkill}
                onChange={e => setSelectedSkill(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-500"
              >
                <option className="text-slate-500" value="" disabled selected>
                  -- Select a skill --
                </option>
                {skillOptions.map(skill => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="level"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Select level
              </label>
              <select
                id="level"
                value={selectedLevel}
                onChange={e => setSelectedLevel(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-500"
              >
                {levelOptions.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              size="lg"
              onClick={handleGenerateQuiz}
              isLoading={loading}
              disabled={!selectedSkill || !selectedLevel || loading}
            >
              <BrainCircuit className="h-4 w-4" />
              Start quiz
            </Button>
          </div>

          {error && (
            <div className="mt-6 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
              {error}
            </div>
          )}
        </Card>
      ) : !submitted ? (
        <div className="space-y-6">
          <Card className="border-indigo-100 bg-indigo-50/70">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-700">
                  Assessment
                </p>
                <h3 className="text-2xl font-bold text-slate-900">
                  {selectedSkill} · {selectedLevel}
                </h3>
              </div>
              <div className="rounded-xl bg-white px-3 py-2 text-sm text-slate-700 shadow-sm">
                {answeredCount}/{questions.length} answered
              </div>
            </div>
          </Card>

          <div className="space-y-5">
            {questions.map((question, index) => (
              <Card key={`${selectedSkill}-${index}`}>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold tracking-wide text-indigo-700 uppercase">
                    {question.topic}
                  </span>
                  <span className="text-sm font-medium text-slate-500">
                    Q{index + 1}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-slate-900">
                  {question.question}
                </h3>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {question.options.map((option, optionIndex) => {
                    const isSelected = answers[index] === optionIndex;

                    return (
                      <button
                        key={`${question.question}-${optionIndex}`}
                        type="button"
                        onClick={() => handleAnswerSelect(index, optionIndex)}
                        className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-200'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </Card>
            ))}
          </div>

          <div className="flex flex-col items-end gap-3">
            {!isReadyToSubmit && (
              <p className="text-sm text-amber-700">
                Please answer all {questions.length} questions before
                submitting.
              </p>
            )}
            <Button
              onClick={handleSubmitAnswers}
              disabled={!isReadyToSubmit}
              size="lg"
            >
              Submit answers
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <Card className="border-indigo-100 bg-indigo-50/70">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-700">
                  Assessment
                </p>
                <h3 className="text-2xl font-bold text-slate-900">
                  {selectedSkill} · {selectedLevel}
                </h3>
              </div>
              <div className="rounded-xl bg-white px-4 py-3 text-right shadow-sm">
                <p className="text-sm text-slate-500">Score</p>
                <p className="text-3xl font-bold text-slate-900">
                  {score}/{totalQuestions}
                </p>
              </div>
            </div>
          </Card>

          <div className="space-y-5">
            {questions.map((question, index) => {
              const selectedAnswer = answers[index];
              const isCorrect = selectedAnswer === question.correctIndex;
              const isAnswered = selectedAnswer !== undefined;

              return (
                <Card
                  key={`${selectedSkill}-${index}`}
                  className={
                    isAnswered && isCorrect
                      ? 'border-emerald-200 bg-emerald-50/40'
                      : 'border-slate-200 bg-white'
                  }
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold tracking-wide text-indigo-700 uppercase">
                      {question.topic}
                    </span>
                    <span className="text-sm font-medium text-slate-500">
                      Q{index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900">
                    {question.question}
                  </h3>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {question.options.map((option, optionIndex) => {
                      const isSelected = selectedAnswer === optionIndex;
                      const showCorrect =
                        isAnswered && question.correctIndex === optionIndex;

                      return (
                        <button
                          key={`${question.question}-${optionIndex}`}
                          type="button"
                          disabled
                          className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all ${
                            showCorrect
                              ? 'border-emerald-500 bg-emerald-100 text-emerald-800'
                              : isSelected
                                ? 'border-rose-500 bg-rose-100 text-rose-700'
                                : 'border-slate-200 bg-white text-slate-700'
                          } cursor-default`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 rounded-lg border border-slate-200 bg-white p-3">
                    <p className="text-sm font-semibold text-slate-900">
                      {isAnswered
                        ? isCorrect
                          ? 'Correct answer'
                          : 'Feedback'
                        : 'Not answered'}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {isAnswered
                        ? question.explanation
                        : 'This question was skipped, so no correctness status is shown until an answer is selected.'}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>

          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Final result</p>
                <h4 className="text-xl font-bold text-slate-900">
                  {getLevelLabel()}
                </h4>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {percentage >= 75
                ? 'Strong performance. You are well-prepared for this skill and can focus on polishing depth and consistency.'
                : percentage >= 45
                  ? 'Good foundation. You understand the basics, but practice on weak areas to reach more confident interview performance.'
                  : 'You need more focused revision on core topics. Prioritize these concept areas before the next mock interview.'}
            </p>
          </Card>

          <Card>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              <h4 className="text-lg font-semibold text-slate-900">
                Areas to prepare more
              </h4>
            </div>

            {focusAreas.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {focusAreas.map(([topic, count]) => (
                  <li
                    key={topic}
                    className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900"
                  >
                    <span className="font-semibold">{topic}</span> — review this
                    topic more deeply ({count} missed question
                    {count > 1 ? 's' : ''}).
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-emerald-700">
                Excellent! You answered most questions correctly. Keep revising
                periodically and try a harder level next.
              </p>
            )}
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={resetQuiz}>
              <RefreshCcw className="h-4 w-4" />
              Try another skill
            </Button>
            <Button onClick={() => setSubmitted(false)} variant="secondary">
              Review answers
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillQuiz;
