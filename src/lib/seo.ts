import { Metadata } from 'next';
import { Post } from './content';

export function generatePostMetadata(post: Post): Metadata {
  const url = `https://openclawwiki.com/posts/${post.slug}`;
  const image = post.coverImage || '/og-image.png';

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: 'OpenClaw Wiki',
      images: [{ url: image }],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateJsonLd(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.coverImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'OpenClaw Wiki',
      logo: {
        '@type': 'ImageObject',
        url: 'https://openclawwiki.com/logo.png',
      },
    },
    keywords: post.keywords.join(', '),
  };
}

export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
