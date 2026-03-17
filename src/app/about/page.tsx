import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About | OpenClaw Wiki',
  description: 'Learn about OpenClaw Wiki - The ultimate resource for OpenClaw AI agents, tutorials, and automation guides.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-8">
          About OpenClaw Wiki
        </h1>

        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
            OpenClaw Wiki is the ultimate resource for learning about OpenClaw AI agents, 
            automation tools, and building intelligent workflows.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-12 mb-4">
            Our Mission
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            We aim to make AI agent development accessible to everyone. Whether you&apos;re 
            a beginner just starting out or an experienced developer looking to build 
            complex automation workflows, OpenClaw Wiki has something for you.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-12 mb-4">
            What You&apos;ll Find Here
          </h2>
          <ul className="space-y-3 text-zinc-600 dark:text-zinc-400 mb-6">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>Comprehensive Tutorials:</strong> Step-by-step guides for building AI agents</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>Agent Templates:</strong> Ready-to-use agent configurations</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>Tool Guides:</strong> Deep dives into OpenClaw tools and integrations</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>Best Practices:</strong> Tips and tricks for effective agent design</span>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-12 mb-4">
            Get Involved
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            OpenClaw Wiki is an open community. We welcome contributions, feedback, 
            and suggestions. Join us on GitHub to contribute to the project or 
            report issues.
          </p>

          <div className="mt-12 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Connect With Us
            </h3>
            <div className="flex space-x-6">
              <a
                href="https://github.com/openclaw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                GitHub
              </a>
              <a
                href="/rss.xml"
                className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                RSS Feed
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
