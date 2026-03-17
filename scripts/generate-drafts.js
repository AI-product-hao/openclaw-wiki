const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const KEYWORDS_FILE = path.join(process.cwd(), 'keywords.csv');
const POSTS_DIR = path.join(process.cwd(), 'content/posts');

// Article templates
const templates = {
  tutorial: `## Introduction

In this tutorial, you'll learn about {primary_keyword} and how to implement it effectively.

## Prerequisites

Before starting, ensure you have:
- Basic understanding of OpenClaw
- Development environment set up
- Necessary API keys configured

## Step-by-Step Guide

### Step 1: Setup

Start by setting up your environment...

### Step 2: Configuration

Configure the necessary settings...

### Step 3: Implementation

Implement the core functionality...

### Step 4: Testing

Test your implementation...

## Common Mistakes

- Mistake 1: Not reading the documentation
- Mistake 2: Skipping error handling
- Mistake 3: Poor performance optimization

## FAQ

**Q: How long does it take to learn?**

A: It depends on your background, but most users become proficient within a few weeks.

**Q: Is this suitable for beginners?**

A: Yes, this guide is designed for all skill levels.

## Conclusion

You now have a solid understanding of {primary_keyword}. Continue exploring to unlock its full potential!`,

  guide: `## Overview

This guide covers everything you need to know about {primary_keyword}.

## What is {primary_keyword}?

{primary_keyword} is an important concept in the OpenClaw ecosystem...

## Why Use {primary_keyword}?

The benefits include:
- Improved efficiency
- Better results
- Easier maintenance

## Getting Started

### Installation

\`\`\`bash
npm install openclaw
\`\`\`

### Basic Usage

\`\`\`javascript
import { OpenClaw } from 'openclaw';

const agent = new OpenClaw();
\`\`\`

## Best Practices

1. Always validate inputs
2. Use proper error handling
3. Follow naming conventions
4. Document your code

## Troubleshooting

### Common Issues

**Issue 1**: Description and solution...

**Issue 2**: Description and solution...

## Conclusion

{primary_keyword} is a powerful tool for building AI agents. Start using it today!`,

  comparison: `## Overview

In this comparison, we'll look at {primary_keyword} versus alternatives to help you make an informed decision.

## Quick Comparison

| Feature | {primary_keyword} | Alternative |
|---------|-------------------|-------------|
| Ease of Use | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Flexibility | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Performance | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

## Detailed Analysis

### Feature Comparison

#### {primary_keyword}

- Pros: List advantages
- Cons: List disadvantages

#### Alternative

- Pros: List advantages
- Cons: List disadvantages

## Use Cases

### When to Choose {primary_keyword}

- Use case 1
- Use case 2

### When to Choose Alternative

- Use case 1
- Use case 2

## Conclusion

Both options are excellent. Your choice should depend on your specific requirements.`,

  showcase: `## Introduction

Check out these amazing examples of {primary_keyword} in action!

## Featured Projects

### Project 1: Name

Description of the project and how it uses {primary_keyword}...

### Project 2: Name

Description of the project and how it uses {primary_keyword}...

## Code Examples

\`\`\`javascript
// Example code
const example = () => {
  console.log('Hello, OpenClaw!');
};
\`\`\`

## Lessons Learned

Key takeaways from these projects:

1. Lesson 1
2. Lesson 2
3. Lesson 3

## Get Inspired

Ready to build your own project? Check out our [getting started guide](/posts/what-is-openclaw).`,

  default: `## Introduction

Learn about {primary_keyword} in this comprehensive article.

## Main Content

[Write your main content here...]

## Key Points

- Point 1
- Point 2
- Point 3

## Conclusion

[Summarize the article and provide next steps...]`
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
}

function generateFrontmatter(keyword) {
  const now = new Date().toISOString().split('T')[0];
  const slug = slugify(keyword.primary_keyword);
  
  return `---
title: "${keyword.primary_keyword}"
slug: "${slug}"
description: "Learn about ${keyword.primary_keyword}. ${keyword.search_intent} guide for ${keyword.target_audience}."
category: "${keyword.article_type === 'tutorial' ? 'tutorials' : 'guides'}"
tags: [${keyword.secondary_keywords.split(',').map(k => `"${k.trim()}"`).join(', ')}]
status: "draft"
publishedAt: "${now}"
updatedAt: "${now}"
author: "OpenClaw Team"
featured: false
coverImage: ""
keywords: ["${keyword.primary_keyword}", ${keyword.secondary_keywords.split(',').map(k => `"${k.trim()}"`).join(', ')}]
---

`;
}

function generateContent(keyword) {
  const template = templates[keyword.article_type] || templates.default;
  return template.replace(/{primary_keyword}/g, keyword.primary_keyword);
}

function generateDraft(keyword) {
  const slug = slugify(keyword.primary_keyword);
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  
  // Check if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping ${slug}: File already exists`);
    return false;
  }
  
  const content = generateFrontmatter(keyword) + generateContent(keyword);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Created: ${slug}.md`);
  return true;
}

async function main() {
  console.log('🚀 Generating draft articles from keywords.csv...\n');
  
  // Ensure posts directory exists
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }
  
  // Check if keywords file exists
  if (!fs.existsSync(KEYWORDS_FILE)) {
    console.error('❌ Error: keywords.csv not found');
    process.exit(1);
  }
  
  const keywords = [];
  
  // Read CSV file
  await new Promise((resolve, reject) => {
    fs.createReadStream(KEYWORDS_FILE)
      .pipe(csv())
      .on('data', (data) => keywords.push(data))
      .on('end', resolve)
      .on('error', reject);
  });
  
  console.log(`📊 Found ${keywords.length} keywords\n`);
  
  let created = 0;
  let skipped = 0;
  
  // Generate drafts for pending keywords
  for (const keyword of keywords) {
    if (keyword.status === 'pending') {
      const success = generateDraft(keyword);
      if (success) {
        created++;
      } else {
        skipped++;
      }
    }
  }
  
  console.log(`\n📈 Summary:`);
  console.log(`   Created: ${created}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`\n💡 Next steps:`);
  console.log(`   1. Edit the draft files in content/posts/`);
  console.log(`   2. Change status from "draft" to "approved" when ready`);
  console.log(`   3. Run the dev server to preview: npm run dev`);
}

main().catch(console.error);
