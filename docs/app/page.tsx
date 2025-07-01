'use client';
import {
  BookCopy,
  Copy,
  GithubIcon,
  GitMerge,
  Package,
  Puzzle,
  ShieldPlus,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


type Feature = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

const features: Feature[] = [
  {
    title: 'Declarative & Readable',
    description:
      'Describe string logic in a human-readable way, not with cryptic regex.',
    icon: BookCopy,
  },
  {
    title: 'Fully Type-Safe',
    description:
      'Catch errors at compile time, not runtime, with excellent autocompletion.',
    icon: ShieldPlus,
  },
  {
    title: 'Zero Dependencies',
    description:
      'No extra baggage. Just a lightweight library to keep your project lean.',
    icon: Package,
  },
  {
    title: 'Two-Way Chaining',
    description:
      'Seamlessly switch between validation and transformation APIs in one chain.',
    icon: GitMerge,
  },
  {
    title: 'Reusable & Composable',
    description:
      'Build logic once, then reuse, branch, and compose it anywhere you need.',
    icon: Copy,
  },
  {
    title: 'Extensible',
    description:
      'Easily add your own custom logic with customCheck() and customTransform().',
    icon: Puzzle,
  },
];

type FeatureCardProps = {
  feature: Feature;
};

function FeatureCard({ feature }: FeatureCardProps) {
  const { title, description, icon: Icon } = feature;
  return (
    <div className='rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-violet-700/50 hover:bg-violet-950/30'>
      <div className="mb-4">
        <Icon className="mx-auto h-10 w-10 text-violet-400" />
      </div>
      <h3 className="mb-2 font-bold text-violet-200 text-xl">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  return (
    <div className='flex min-h-screen flex-col items-center justify-start space-y-16 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] bg-zinc-950 px-4 py-12 text-white sm:px-8'>
      <header className="sticky top-4 z-10 mx-auto flex w-full max-w-6xl items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/30 px-4 py-3 text-zinc-200 backdrop-blur-lg">
        <h1 className="flex items-center gap-2 font-bold text-lg">
          👾 regist
        </h1>
        <div className="flex items-center gap-2">
          <button
            className="rounded-lg px-4 py-2 text-sm text-zinc-300 transition-colors hover:text-white"
            onClick={() => router.push('/docs')}
            type="button"
          >
            Documentation
          </button>
          <Link
            className="hidden sm:flex"
            href="https://github.com/Hussseinkizz/regist"
          >
            <GithubIcon className="text-zinc-400 transition-colors hover:text-white" />
          </Link>
        </div>
      </header>

      <main className="flex flex-col items-center gap-16">
        {/* Header with Brand */}
        <header className="mb-4 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text font-extrabold text-5xl text-transparent sm:text-6xl">
            regist
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-gray-400 text-lg sm:text-xl">
            A declarative, type-safe, and human-readable library for string
            validation and transformation.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/docs">
              <span className="rounded-full bg-violet-600 px-8 py-3 font-semibold text-white shadow-lg shadow-violet-900/50 transition hover:bg-violet-500 hover:shadow-violet-700/50">
                Get Started
              </span>
            </Link>
            <a
              className="flex items-center gap-2 rounded-full border border-zinc-700 px-8 py-3 text-zinc-300 transition hover:border-zinc-500"
              href="https://github.com/Hussseinkizz/regist"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Star className="h-5 w-5 text-yellow-400" />
              <span>Star on GitHub</span>
            </a>
          </div>
        </header>

        {/* Installation Command */}
        <section className="w-full max-w-xl">
          <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900 p-4">
            <pre className="text-center font-mono text-sm text-violet-200">
              <code>{'npm install @regist/regist'}</code>
            </pre>
          </div>
        </section>

        {/* Regex vs Regist Section */}
        <section className="w-full max-w-5xl text-center">
          <h2 className="mb-2 font-bold text-3xl text-violet-300">
            Stop Fighting with Regex
          </h2>
          <p className="mb-8 text-gray-400">
            Write readable, maintainable string logic that everyone on your team
            can understand.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Column 1: The Old Way */}
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="mb-4 font-semibold text-red-400 text-xl">
                The Old Way: Regex
              </h3>
              <p className="mb-4 text-left text-gray-400 text-sm">
                Validating a strong password (8+ chars, uppercase, lowercase,
                digit, special char) is cryptic and error-prone.
              </p>
              <pre className="overflow-x-auto rounded-md bg-zinc-800 p-4 text-left font-mono text-sm">
                <code className="text-nowrap">{`const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[^A-Za-z0-9]).{8,}$/;

regex.test("Aa1!aa11"); // true`}</code>
              </pre>
            </div>
            {/* Column 2: The New Way */}
            <div className="rounded-lg border border-violet-700/80 bg-zinc-900 p-6">
              <h3 className="mb-4 font-semibold text-green-400 text-xl">
                The <span className="font-bold">regist</span> Way
              </h3>
              <p className="mb-4 text-left text-gray-400 text-sm">
                Use a declarative, fluent API that reads like plain English and
                prevents bugs.
              </p>
              <pre className="overflow-x-auto rounded-md bg-zinc-800 p-4 text-left font-mono text-sm">
                <code className="text-nowrap">{`import { assertThat } from 'regist';

assertThat("Aa1!aa11")
  .isStrongPassword()
  .try(); // true`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid w-full max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard feature={feature} key={feature.title} />
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="flex w-full items-center justify-center pt-8 text-gray-600 text-sm">
        Made With 🧡 By
        <a
          className="flex px-1 text-violet-400 hover:underline"
          href="mailto:hssnkizz@gmail.com"
        >
          Hussein Kizz
        </a>
      </footer>
    </div>
  );
}
