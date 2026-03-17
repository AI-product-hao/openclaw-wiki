# OpenClaw Wiki

The Ultimate Guide to OpenClaw AI Agents - A SEO-optimized content website built with Next.js.

## 🌐 Live Site

**Domain**: [openclawwiki.com](https://openclawwiki.com)

## 🎯 Project Goals

- SEO-first content website for OpenClaw-related tutorials and guides
- Support for automated content production
- Foundation for future AI Agent Hub / Marketplace

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Content**: Markdown/MDX with gray-matter
- **Deployment**: Vercel-ready static export

## 📁 Project Structure

```
openclaw-wiki/
├── content/
│   ├── posts/          # Markdown/MDX articles
│   └── categories/     # Category definitions
├── src/
│   ├── app/           # Next.js app router pages
│   │   ├── page.tsx   # Homepage
│   │   ├── posts/[slug]/page.tsx  # Article detail
│   │   ├── [category]/page.tsx    # Category pages
│   │   ├── tags/[tag]/page.tsx    # Tag pages
│   │   ├── search/page.tsx        # Search page
│   │   ├── about/page.tsx         # About page
│   │   ├── sitemap/page.tsx       # HTML sitemap
│   │   ├── sitemap.xml/route.ts   # XML sitemap
│   │   ├── rss.xml/route.ts       # RSS feed
│   │   └── robots.txt/route.ts    # Robots.txt
│   ├── components/    # React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── PostCard.tsx
│   └── lib/          # Utility functions
│       ├── content.ts
│       └── seo.ts
├── scripts/
│   └── generate-drafts.js  # Content automation
├── keywords.csv       # Keyword input for automation
└── public/           # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm/pnpm/yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd openclaw-wiki

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
```

The static site will be generated in the `dist/` directory.

## 📝 Content Management

### Creating a New Article

1. Create a new `.md` file in `content/posts/`:

```bash
# Example: content/posts/my-article.md
```

2. Add frontmatter:

```yaml
---
title: "Your Article Title"
slug: "your-article-slug"
description: "Brief description for SEO"
category: "tutorials"
tags: ["tag1", "tag2"]
status: "published"  # or "draft" or "approved"
publishedAt: "2026-03-14"
updatedAt: "2026-03-14"
author: "Your Name"
featured: false
coverImage: "/images/cover.png"
keywords: ["keyword1", "keyword2"]
---

Your article content here...
```

3. Only articles with `status: "published"` or `status: "approved"` will appear on the site.

### Content Automation

#### Using Keywords CSV

1. Add keywords to `keywords.csv`:

```csv
primary_keyword,secondary_keywords,search_intent,article_type,target_audience,status
OpenClaw tutorial,"learn, guide",informational,tutorial,beginners,pending
```

2. Generate draft articles:

```bash
npm run generate:drafts
```

This will create draft articles in `content/posts/` based on your keywords.

#### Article Templates

The generator supports these article types:
- `tutorial` - Step-by-step tutorials
- `guide` - Comprehensive guides
- `comparison` - Product/feature comparisons
- `showcase` - Project showcases
- `default` - Generic article structure

## 🔍 SEO Features

### Automatic SEO Generation

- ✅ Metadata (title, description, keywords)
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Canonical URLs
- ✅ JSON-LD structured data
- ✅ Automatic sitemap.xml
- ✅ RSS feed
- ✅ robots.txt

### Article SEO

Each article automatically includes:
- Breadcrumb navigation
- Article schema markup
- Author information
- Publish/update dates
- Tags and categories

## 🎨 Customization

### Styling

The project uses Tailwind CSS. Customize styles in:
- `src/app/globals.css` - Global styles
- Individual component files

### Components

Reusable components in `src/components/`:
- `Header.tsx` - Site navigation
- `Footer.tsx` - Site footer
- `PostCard.tsx` - Article card display

## 📦 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Deploy automatically

### Other Static Hosts

Build the project and deploy the `dist/` folder:

```bash
npm run build
# Deploy dist/ folder to your host
```

## 🔧 Configuration

### Site Settings

Edit `src/app/layout.tsx` to update:
- Site title
- Default description
- Social metadata

### Content Status

Articles support three statuses:
- `draft` - Hidden from site (work in progress)
- `approved` - Visible on site
- `published` - Visible on site (final)

## 📈 Future Enhancements

- [ ] Search API integration
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Newsletter subscription
- [ ] Comment system
- [ ] Dark mode toggle

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines before submitting PRs.

## 📞 Support

- Documentation: [docs.openclaw.com](https://docs.openclaw.com)
- Issues: GitHub Issues
- Community: Discord

---

Built with ❤️ using OpenClaw and Next.js
