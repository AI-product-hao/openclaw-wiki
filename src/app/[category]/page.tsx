import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublishedPosts, getPostsByCategory, getAllCategories } from '@/lib/content';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PostGrid } from '@/components/PostCard';

interface PageProps {
  params: Promise<{ category: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const dynamicCategories = getAllCategories();
  // Ensure we always generate static pages for the routes linked in the Header
  const staticCategories = ['tutorials', 'agents', 'tools', 'templates', 'guides'];
  
  // Combine dynamic and static categories, removing duplicates
  const allCategories = Array.from(new Set([...dynamicCategories, ...staticCategories]));
  
  return allCategories.map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const posts = getPostsByCategory(category);
  
  return {
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} | OpenClaw Wiki`,
    description: `Browse all ${category} articles on OpenClaw Wiki. ${posts.length} articles available.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const posts = getPostsByCategory(category);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white capitalize mb-4">
            {category}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            {posts.length} article{posts.length !== 1 ? 's' : ''} in this category
          </p>
        </div>

        <PostGrid posts={posts} showCategory={false} />
      </main>

      <Footer />
    </div>
  );
}
