import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getPostBySlug, getPublishedPosts, getRelatedPosts, markdownToHtml } from '@/lib/content';
import { generatePostMetadata, generateJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PostGrid } from '@/components/PostCard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = getPublishedPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: 'Post Not Found' };
  }
  return generatePostMetadata(post);
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Don't show draft posts in production
  if (post.status === 'draft' && process.env.NODE_ENV === 'production') {
    notFound();
  }

  const contentHtml = await markdownToHtml(post.content);
  const relatedPosts = getRelatedPosts(slug, 3);

  const jsonLd = generateJsonLd(post);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: 'https://openclawwiki.com' },
    { name: post.category, url: `https://openclawwiki.com/${post.category}` },
    { name: post.title, url: `https://openclawwiki.com/posts/${post.slug}` },
  ]);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Header />
      
      <main>
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        {/* Breadcrumbs */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <nav className="flex items-center text-sm text-zinc-500 dark:text-zinc-400">
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/${post.category}`} className="capitalize hover:text-zinc-900 dark:hover:text-white">
              {post.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-zinc-900 dark:text-white truncate">{post.title}</span>
          </nav>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <header className="mb-12">
            <div className="flex items-center space-x-2 mb-4">
              <Link
                href={`/${post.category}`}
                className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide"
              >
                {post.category}
              </Link>
              {post.status === 'draft' && (
                <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded">
                  Draft
                </span>
              )}
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
              {post.title}
            </h1>
            
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-6">
              {post.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
              <span>{post.author}</span>
              <span>•</span>
              <time dateTime={post.publishedAt}>
                Published {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              {post.updatedAt !== post.publishedAt && (
                <>
                  <span>•</span>
                  <time dateTime={post.updatedAt}>
                    Updated {new Date(post.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </>
              )}
            </div>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag}`}
                    className="px-3 py-1 text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </header>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="mb-12">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}

          {/* Article Content */}
          <div
            className="prose prose-zinc dark:prose-invert max-w-none
              prose-headings:font-semibold prose-headings:text-zinc-900 dark:prose-headings:text-white
              prose-p:text-zinc-700 dark:prose-p:text-zinc-300
              prose-a:text-blue-600 dark:prose-a:text-blue-400
              prose-strong:text-zinc-900 dark:prose-strong:text-white
              prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-zinc-900 prose-pre:text-zinc-100
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-zinc-50 dark:prose-blockquote:bg-zinc-900 prose-blockquote:pl-4 prose-blockquote:py-2
              prose-img:rounded-lg
              prose-ul:list-disc prose-ol:list-decimal"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">
              Related Articles
            </h2>
            <PostGrid posts={relatedPosts} />
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
