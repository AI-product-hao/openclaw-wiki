import Link from 'next/link';
import { Metadata } from 'next';
import { 
  getPublishedPosts, 
  getPostsByCategory, 
  getFeaturedPosts,
  getLatestPosts 
} from '@/lib/content';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PostGrid } from '@/components/PostCard';

export const metadata: Metadata = {
  title: 'OpenClaw Wiki – The Ultimate Guide to OpenClaw AI Agents',
  description: 'Tutorials, Tools, Agents, Templates, and Automation Guides for OpenClaw. Learn how to build AI agents with OpenClaw.',
  keywords: ['OpenClaw', 'AI agents', 'automation', 'tutorials', 'tools', 'templates'],
  openGraph: {
    title: 'OpenClaw Wiki – The Ultimate Guide to OpenClaw AI Agents',
    description: 'Tutorials, Tools, Agents, Templates, and Automation Guides for OpenClaw.',
    url: 'https://openclawwiki.com',
    siteName: 'OpenClaw Wiki',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenClaw Wiki – The Ultimate Guide to OpenClaw AI Agents',
    description: 'Tutorials, Tools, Agents, Templates, and Automation Guides for OpenClaw.',
  },
  alternates: {
    canonical: 'https://openclawwiki.com',
  },
};

export default function Home() {
  const beginnerPosts = getPostsByCategory('tutorials').slice(0, 3);
  const tutorialPosts = getPostsByCategory('tutorials').slice(0, 3);
  const agentPosts = getPostsByCategory('agents').slice(0, 3);
  const toolPosts = getPostsByCategory('tools').slice(0, 3);
  const templatePosts = getPostsByCategory('templates').slice(0, 3);
  const latestPosts = getLatestPosts(3);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
                OpenClaw Wiki
              </h1>
              <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-4">
                The Ultimate Guide to OpenClaw AI Agents
              </p>
              <p className="text-lg text-zinc-500 dark:text-zinc-500 mb-10">
                Tutorials, Tools, Agents, Templates, and Automation Guides for OpenClaw
              </p>
              <Link
                href="/tutorials"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
              >
                Start Learning OpenClaw
              </Link>
            </div>
          </div>
        </section>

        {/* Beginner Guide Section */}
        <section className="py-16 bg-white dark:bg-zinc-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                Beginner Guides
              </h2>
              <Link
                href="/tutorials"
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                View all →
              </Link>
            </div>
            <PostGrid posts={beginnerPosts.length > 0 ? beginnerPosts : []} />
          </div>
        </section>

        {/* Popular Tutorials Section */}
        <section className="py-16 bg-zinc-50 dark:bg-zinc-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                Popular Tutorials
              </h2>
              <Link
                href="/tutorials"
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                View all →
              </Link>
            </div>
            <PostGrid posts={tutorialPosts.length > 0 ? tutorialPosts : []} />
          </div>
        </section>

        {/* AI Agents Section */}
        <section className="py-16 bg-white dark:bg-zinc-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                AI Agents
              </h2>
              <Link
                href="/agents"
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                View all →
              </Link>
            </div>
            <PostGrid posts={agentPosts.length > 0 ? agentPosts : []} />
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-16 bg-zinc-50 dark:bg-zinc-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                Tools
              </h2>
              <Link
                href="/tools"
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                View all →
              </Link>
            </div>
            <PostGrid posts={toolPosts.length > 0 ? toolPosts : []} />
          </div>
        </section>

        {/* Templates Section */}
        <section className="py-16 bg-white dark:bg-zinc-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                Templates
              </h2>
              <Link
                href="/templates"
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                View all →
              </Link>
            </div>
            <PostGrid posts={templatePosts.length > 0 ? templatePosts : []} />
          </div>
        </section>

        {/* Latest Articles Section */}
        <section className="py-16 bg-zinc-50 dark:bg-zinc-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                Latest Articles
              </h2>
              <Link
                href="/guides"
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                View all →
              </Link>
            </div>
            <PostGrid posts={latestPosts.length > 0 ? latestPosts : []} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
