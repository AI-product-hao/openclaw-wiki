import { getPublishedPosts, getAllCategories, getAllTags, toPostSummary } from '@/lib/content';
import SearchPageClient from '@/components/SearchClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search | OpenClaw Wiki',
  description: 'Search articles, tutorials, and guides on OpenClaw Wiki.',
};

export default function SearchPage() {
  const posts = getPublishedPosts().map(toPostSummary);
  const categories = getAllCategories();
  const tags = getAllTags();

  return <SearchPageClient posts={posts} categories={categories} tags={tags} />;
}
