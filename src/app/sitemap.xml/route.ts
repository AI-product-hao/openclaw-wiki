export const dynamic = 'force-static';

import { getPublishedPosts, getAllCategories, getAllTags } from '@/lib/content';

export async function GET() {
  const posts = getPublishedPosts();
  const categories = getAllCategories();
  const tags = getAllTags();
  const siteUrl = 'https://openclawwiki.com';

  const routes = [
    { url: '/', priority: 1.0 },
    { url: '/tutorials', priority: 0.9 },
    { url: '/agents', priority: 0.9 },
    { url: '/tools', priority: 0.9 },
    { url: '/templates', priority: 0.9 },
    { url: '/guides', priority: 0.9 },
    { url: '/search', priority: 0.5 },
    { url: '/about', priority: 0.8 },
    { url: '/sitemap', priority: 0.3 },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map(
      (route) => `
  <url>
    <loc>${siteUrl}${route.url}</loc>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join('')}
  ${categories
    .map(
      (category) => `
  <url>
    <loc>${siteUrl}/${category}</loc>
    <priority>0.8</priority>
  </url>`
    )
    .join('')}
  ${tags
    .map(
      (tag) => `
  <url>
    <loc>${siteUrl}/tags/${tag}</loc>
    <priority>0.6</priority>
  </url>`
    )
    .join('')}
  ${posts
    .map(
      (post) => `
  <url>
    <loc>${siteUrl}/posts/${post.slug}</loc>
    <lastmod>${new Date(post.updatedAt).toISOString().split('T')[0]}</lastmod>
    <priority>0.7</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
