import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

export interface Post {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  status: 'draft' | 'approved' | 'published';
  publishedAt: string;
  updatedAt: string;
  author: string;
  featured: boolean;
  coverImage?: string;
  keywords: string[];
  content: string;
  excerpt?: string;
}

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || '',
        description: data.description || '',
        category: data.category || 'uncategorized',
        tags: data.tags || [],
        status: data.status || 'draft',
        publishedAt: data.publishedAt || data.date || new Date().toISOString(),
        updatedAt: data.updatedAt || data.publishedAt || data.date || new Date().toISOString(),
        author: data.author || 'OpenClaw Team',
        featured: data.featured || false,
        coverImage: data.coverImage,
        keywords: data.keywords || [],
        content,
        excerpt: data.excerpt || content.slice(0, 200).replace(/[#*`]/g, '') + '...',
      } as Post;
    });

  return allPosts;
}

export function getPublishedPosts(): Post[] {
  return getAllPosts()
    .filter((post) => post.status === 'approved' || post.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
}

export function getPostsByCategory(category: string): Post[] {
  return getPublishedPosts().filter((post) => post.category === category);
}

export function getPostsByTag(tag: string): Post[] {
  return getPublishedPosts().filter((post) => post.tags.includes(tag));
}

export function getAllCategories(): string[] {
  const posts = getPublishedPosts();
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories);
}

export function getAllTags(): string[] {
  const posts = getPublishedPosts();
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags);
}

export function getFeaturedPosts(): Post[] {
  return getPublishedPosts().filter((post) => post.featured);
}

export function getLatestPosts(limit: number = 6): Post[] {
  return getPublishedPosts().slice(0, limit);
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): Post[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  const allPosts = getPublishedPosts().filter((post) => post.slug !== currentSlug);

  // Score posts based on shared tags and category
  const scoredPosts = allPosts.map((post) => {
    let score = 0;
    if (post.category === currentPost.category) score += 2;
    post.tags.forEach((tag) => {
      if (currentPost.tags.includes(tag)) score += 1;
    });
    return { post, score };
  });

  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(html)
    .process(markdown);
  return result.toString();
}

// Client-safe post type (without content)
export interface PostSummary {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  status: 'draft' | 'approved' | 'published';
  publishedAt: string;
  updatedAt: string;
  author: string;
  featured: boolean;
  coverImage?: string;
  keywords: string[];
  excerpt?: string;
}

export function toPostSummary(post: Post): PostSummary {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    category: post.category,
    tags: post.tags,
    status: post.status,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    author: post.author,
    featured: post.featured,
    coverImage: post.coverImage,
    keywords: post.keywords,
    excerpt: post.excerpt,
  };
}
