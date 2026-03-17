import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublishedPosts, getPostsByTag, getAllTags } from '@/lib/content';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PostGrid } from '@/components/PostCard';

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  
  return {
    title: `Posts tagged "${tag}" | OpenClaw Wiki`,
    description: `Browse all articles tagged with "${tag}" on OpenClaw Wiki. ${posts.length} articles available.`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <div className="inline-block px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full mb-4">
            Tag
          </div>
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            {tag}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            {posts.length} article{posts.length !== 1 ? 's' : ''} tagged with "{tag}"
          </p>
        </div>

        <PostGrid posts={posts} />
      </main>

      <Footer />
    </div>
  );
}
