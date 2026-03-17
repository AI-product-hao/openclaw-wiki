import { Metadata } from 'next';
import { getPublishedPosts, getAllCategories, getAllTags } from '@/lib/content';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Sitemap | OpenClaw Wiki',
  description: 'Complete sitemap of OpenClaw Wiki - Tutorials, Agents, Tools, Templates, and Guides.',
};

export default function SitemapPage() {
  const posts = getPublishedPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">
          Sitemap
        </h1>

        {/* Main Pages */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
            Main Pages
          </h2>
          <ul className="space-y-2">
            {[
              { href: '/', label: 'Home' },
              { href: '/tutorials', label: 'Tutorials' },
              { href: '/agents', label: 'Agents' },
              { href: '/tools', label: 'Tools' },
              { href: '/templates', label: 'Templates' },
              { href: '/guides', label: 'Guides' },
              { href: '/search', label: 'Search' },
              { href: '/about', label: 'About' },
            ].map((page) => (
              <li key={page.href}>
                <a
                  href={page.href}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {page.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
            Categories ({categories.length})
          </h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <a
                  href={`/${category}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline capitalize"
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Tags */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
            Tags ({tags.length})
          </h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <a
                key={tag}
                href={`/tags/${tag}`}
                className="px-3 py-1 text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                {tag}
              </a>
            ))}
          </div>
        </section>

        {/* All Posts */}
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
            All Posts ({posts.length})
          </h2>
          <ul className="space-y-2">
            {posts.map((post) => (
              <li key={post.slug}>
                <a
                  href={`/posts/${post.slug}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {post.title}
                </a>
                <span className="text-sm text-zinc-500 dark:text-zinc-400 ml-2">
                  ({post.category})
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
