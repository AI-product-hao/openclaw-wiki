import Link from 'next/link';
import { Post } from '@/lib/content';

interface PostCardProps {
  post: Post;
  showCategory?: boolean;
}

export function PostCard({ post, showCategory = true }: PostCardProps) {
  return (
    <article className="group flex flex-col h-full bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
      {post.coverImage && (
        <div className="aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="flex flex-col flex-1 p-5">
        {showCategory && (
          <Link
            href={`/${post.category}`}
            className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-2"
          >
            {post.category}
          </Link>
        )}
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4 flex-1">
          {post.description}
        </p>
        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-500">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </time>
          <span>{post.author}</span>
        </div>
      </div>
    </article>
  );
}

interface PostGridProps {
  posts: Post[];
  showCategory?: boolean;
}

export function PostGrid({ posts, showCategory = true }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
        No posts found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} showCategory={showCategory} />
      ))}
    </div>
  );
}
