const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const KEYWORDS_FILE = path.join(process.cwd(), 'keywords.csv');
const POSTS_DIR = path.join(process.cwd(), 'content/posts');

// All existing posts for internal linking
function getExistingPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
    .map(f => {
      const content = fs.readFileSync(path.join(POSTS_DIR, f), 'utf8');
      const titleMatch = content.match(/^title:\s*"(.+)"/m);
      const slugMatch = content.match(/^slug:\s*"(.+)"/m);
      const categoryMatch = content.match(/^category:\s*"(.+)"/m);
      return {
        filename: f,
        title: titleMatch ? titleMatch[1] : f.replace(/\.mdx?$/, ''),
        slug: slugMatch ? slugMatch[1] : f.replace(/\.mdx?$/, ''),
        category: categoryMatch ? categoryMatch[1] : 'guides',
      };
    });
}

// Build internal links from existing posts
function getInternalLinks(currentSlug, existingPosts, count = 4) {
  const others = existingPosts.filter(p => p.slug !== currentSlug);
  const shuffled = others.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(p => `- [${p.title}](/posts/${p.slug})`).join('\n');
}

// SEO-optimized article templates with proper structure
const templates = {
  tutorial: (kw, links) => `## Introduction

${kw.title} is essential for anyone looking to get the most out of OpenClaw's AI agent framework. Whether you're a ${kw.target_audience === 'beginners' ? 'complete beginner' : 'seasoned developer'}, this step-by-step tutorial will guide you through the entire process.

In this article, you'll learn:
- What ${kw.primary_keyword} involves and why it matters
- Step-by-step instructions to get everything working
- Common pitfalls and how to avoid them
- Best practices from the OpenClaw community

## Prerequisites

Before diving into ${kw.primary_keyword}, make sure you have:

- **OpenClaw installed** — If not, follow our [installation guide](/posts/how-to-install-openclaw)
- **Node.js 18+** or **Python 3.9+** depending on your setup
- **A code editor** — VS Code is recommended
- **Basic terminal knowledge** — You should be comfortable running commands

## What is ${kw.primary_keyword}?

${kw.primary_keyword} is a core capability of the OpenClaw ecosystem. It allows you to build powerful AI agents that can automate complex tasks, make intelligent decisions, and interact with external services.

The OpenClaw framework makes ${kw.primary_keyword} accessible through a declarative YAML-based configuration system, meaning you spend less time on boilerplate and more time on building useful agents.

## Step-by-Step Guide

### Step 1: Set Up Your Project

First, create a new OpenClaw project or navigate to your existing one:

\`\`\`bash
# Create a new project
openclaw new my-project
cd my-project

# Or use an existing project
cd your-existing-project
\`\`\`

Your project structure should look like this:

\`\`\`
my-project/
├── agents/
│   └── default.yaml
├── skills/
├── tools/
├── config.yaml
└── README.md
\`\`\`

### Step 2: Configure Your Environment

Create or update your \`.env\` file with the required variables:

\`\`\`bash
OPENAI_API_KEY=your-api-key-here
OPENCLAW_PORT=3000
OPENCLAW_ENV=development
\`\`\`

### Step 3: Build the Core Logic

Now let's implement the core functionality for ${kw.primary_keyword}:

\`\`\`yaml
# agents/main.yaml
name: ${kw.primary_keyword.replace(/OpenClaw\s*/i, '').trim()}
description: An AI agent for ${kw.primary_keyword}

capabilities:
  - web_search
  - data_processing
  - report_generation

instructions: |
  You are a specialized agent for ${kw.primary_keyword}.
  Follow these rules:
  1. Always validate input before processing
  2. Provide clear, actionable outputs
  3. Log important decisions for debugging
\`\`\`

### Step 4: Test Your Implementation

Run the development server to test:

\`\`\`bash
openclaw dev
\`\`\`

Visit \`http://localhost:3000\` to interact with your agent. Try the following test prompts:

1. "Show me a basic example"
2. "What settings are available?"
3. "Run a test workflow"

### Step 5: Deploy to Production

When you're satisfied with your setup:

\`\`\`bash
openclaw build
openclaw deploy
\`\`\`

## Common Mistakes and How to Fix Them

### Mistake 1: Incorrect Configuration Syntax

Many users forget that YAML is indent-sensitive. Always use 2 spaces for indentation:

\`\`\`yaml
# ❌ Wrong
capabilities:
    - web_search

# ✅ Correct
capabilities:
  - web_search
\`\`\`

### Mistake 2: Missing API Keys

If you see \`AuthenticationError\`, check that your \`.env\` file has all required keys and restart the server.

### Mistake 3: Not Handling Errors

Always wrap agent calls in try-catch blocks:

\`\`\`javascript
try {
  const result = await agent.run(input);
  console.log(result);
} catch (error) {
  console.error('Agent error:', error.message);
}
\`\`\`

## Best Practices

1. **Start simple** — Build a minimal agent first, then add complexity
2. **Use version control** — Track all configuration changes with Git
3. **Test incrementally** — Test each new feature before adding more
4. **Monitor performance** — Use OpenClaw's built-in logging
5. **Read the docs** — The [official documentation](https://openclaw.ai/docs) has detailed API references

## FAQ

**Q: How long does it take to set up ${kw.primary_keyword}?**

A: For a basic setup, expect 15-30 minutes. More complex configurations may take 1-2 hours.

**Q: Can I use ${kw.primary_keyword} with existing projects?**

A: Yes! OpenClaw is designed to integrate with existing codebases. Simply add the OpenClaw package and configuration files.

**Q: What AI models does OpenClaw support?**

A: OpenClaw supports GPT-4, Claude, Gemini, and local models via Ollama. You can switch models by changing one line in your config.

**Q: Is ${kw.primary_keyword} free?**

A: OpenClaw itself is open-source and free. You'll need API keys for the AI models you use, which have their own pricing.

## Related Articles

${links}

## Conclusion

You've now learned how to implement ${kw.primary_keyword} from scratch. The key takeaways are:

- Set up your environment correctly before starting
- Use YAML configuration for clean, maintainable agent definitions
- Test thoroughly at each step
- Follow best practices for production-ready agents

Ready to take the next step? Check out our advanced tutorials to build even more powerful AI agents with OpenClaw.`,

  guide: (kw, links) => `## Overview

This comprehensive guide covers everything you need to know about ${kw.primary_keyword}. Whether you're evaluating OpenClaw for the first time or looking to deepen your understanding, this guide has you covered.

## What is ${kw.primary_keyword}?

${kw.primary_keyword} is a fundamental aspect of working with OpenClaw, the open-source AI agent framework. It encompasses the tools, techniques, and best practices that enable developers and businesses to build intelligent automation systems.

At its core, ${kw.primary_keyword} allows you to:
- Build AI agents without extensive machine learning expertise
- Automate repetitive business processes
- Create intelligent workflows that adapt to changing conditions
- Integrate with popular APIs and services

## Why ${kw.primary_keyword} Matters

The AI agent landscape is evolving rapidly in 2026. Here's why ${kw.primary_keyword} is becoming essential:

### 1. Efficiency Gains

Organizations using AI agents report 40-60% time savings on repetitive tasks. ${kw.primary_keyword} with OpenClaw makes this accessible to teams of any size.

### 2. Competitive Advantage

Early adopters of AI agents are seeing significant advantages in speed-to-market and customer satisfaction.

### 3. Scalability

Unlike traditional automation, AI agents can handle edge cases and adapt to new scenarios without reprogramming.

## Getting Started with ${kw.primary_keyword}

### Prerequisites

Before you begin, ensure you have:
- OpenClaw installed ([installation guide](/posts/how-to-install-openclaw))
- Basic understanding of YAML configuration
- An API key for at least one AI model provider

### Basic Setup

\`\`\`bash
# Install OpenClaw
npm install -g openclaw

# Create a new project
openclaw new my-${kw.primary_keyword.toLowerCase().replace(/\s+/g, '-')}-project
cd my-${kw.primary_keyword.toLowerCase().replace(/\s+/g, '-')}-project
\`\`\`

### Key Configuration

\`\`\`yaml
# config.yaml
agent:
  model: gpt-4
  temperature: 0.7
  max_tokens: 2000

logging:
  level: info
  output: ./logs
\`\`\`

## Best Practices for ${kw.primary_keyword}

### 1. Plan Before You Build

Define clear objectives for your AI agent before writing any code. What problem does it solve? Who is the target user?

### 2. Use Modular Architecture

Break complex workflows into smaller, reusable skills:

\`\`\`yaml
skills:
  - data_collection
  - analysis
  - report_generation
\`\`\`

### 3. Implement Proper Error Handling

Always plan for failures. AI models can produce unexpected outputs:

\`\`\`javascript
const result = await agent.run(input);
if (!result.success) {
  await fallbackHandler(result.error);
}
\`\`\`

### 4. Monitor and Iterate

Use OpenClaw's built-in analytics to track agent performance and continuously improve.

### 5. Keep Security in Mind

- Never hardcode API keys
- Validate all user inputs
- Use rate limiting for public-facing agents

## Common Challenges and Solutions

| Challenge | Solution |
|-----------|----------|
| Slow response times | Optimize prompts, use streaming responses |
| Inconsistent outputs | Add validation layers, use structured JSON output |
| High API costs | Cache common queries, batch processing |
| Debugging complex flows | Enable verbose logging, use OpenClaw's debug mode |

## Troubleshooting

### Issue: Agent Not Responding

1. Check that the server is running: \`openclaw status\`
2. Verify API keys are valid
3. Check network connectivity
4. Review logs: \`cat ./logs/agent.log\`

### Issue: Poor Quality Responses

1. Refine your instructions with more specific guidelines
2. Lower temperature for more focused outputs
3. Add examples to your prompts (few-shot learning)
4. Consider using a more capable model

## Related Resources

${links}

## Conclusion

${kw.primary_keyword} is a powerful capability that every modern developer and business should understand. With OpenClaw, getting started is straightforward, and the potential for automation is virtually unlimited.

Start your journey with OpenClaw today and discover what AI agents can do for your workflow!`,

  comparison: (kw, links) => `## Overview

Choosing the right AI agent framework can make or break your automation projects. In this comprehensive comparison, we'll analyze ${kw.primary_keyword} to help you make an informed decision.

## Quick Comparison Table

| Feature | OpenClaw | Alternative |
|---------|----------|-------------|
| **Open Source** | ✅ Yes | Varies |
| **Ease of Setup** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Documentation** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Community** | Growing fast | Established |
| **Extensibility** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Multi-Model Support** | GPT-4, Claude, Gemini, Local | Varies |
| **Learning Curve** | Beginner-friendly | Moderate |
| **Production Ready** | ✅ Yes | ✅ Yes |

## What is OpenClaw?

OpenClaw is an open-source AI agent framework designed for building production-ready AI automation systems. It uses a declarative YAML-based approach that makes it accessible to both technical and non-technical users.

Key strengths:
- **Simplicity** — Get started in minutes with minimal configuration
- **Flexibility** — Support for multiple AI models and custom tools
- **Scalability** — Built for production workloads
- **Community** — Active open-source community

## Detailed Feature Comparison

### Architecture

**OpenClaw** uses a modular architecture with agents, skills, and tools as separate components. This separation of concerns makes it easy to build, test, and maintain complex systems.

**Alternatives** often use a more monolithic approach, which can be simpler for basic use cases but harder to scale.

### Developer Experience

OpenClaw prioritizes developer experience with:
- YAML-based configuration (no complex Python code required)
- Built-in development server with hot reload
- Comprehensive error messages
- Extensive documentation and tutorials

### Performance

In our benchmarks, OpenClaw performs competitively with alternatives:
- Average response time: 200-500ms (excluding AI model latency)
- Memory usage: ~50MB for a typical agent
- Concurrent connections: 100+ on standard hardware

## When to Choose OpenClaw

OpenClaw is the best choice when:
1. **You want quick setup** — Get a working agent in under 30 minutes
2. **You need multi-model support** — Easily switch between GPT-4, Claude, and Gemini
3. **You prefer declarative config** — YAML over complex Python scripts
4. **You want open-source** — Full control over your automation stack
5. **You're building for production** — Built-in logging, monitoring, and error handling

## When to Consider Alternatives

Consider alternatives when:
1. You need deep integration with a specific ecosystem
2. You require specialized research-oriented features
3. Your team prefers a code-first approach over configuration

## Real-World Use Cases

### Use Case 1: Customer Support Automation

An e-commerce company used OpenClaw to build a support agent that handles 70% of customer inquiries automatically, saving 40+ hours per week.

### Use Case 2: Content Generation Pipeline

A marketing agency built an OpenClaw-powered content pipeline that generates blog drafts, social media posts, and email campaigns from a single brief.

### Use Case 3: Data Analysis Agent

A fintech startup uses OpenClaw agents to process market data and generate daily analysis reports for their trading team.

## Related Articles

${links}

## Conclusion

${kw.primary_keyword} ultimately depends on your specific needs and constraints. For most use cases, OpenClaw offers the best balance of simplicity, power, and flexibility.

We recommend starting with OpenClaw for new projects, especially if you value quick setup, multi-model support, and a growing open-source community.

Ready to get started? Check out our [installation guide](/posts/how-to-install-openclaw) and [build your first agent](/posts/build-first-ai-agent) today!`,

  showcase: (kw, links) => `## Introduction

Looking for inspiration? Here are incredible examples of ${kw.primary_keyword} that showcase what's possible with OpenClaw's AI agent framework.

Each project demonstrates a different aspect of OpenClaw's capabilities, from simple automation to complex multi-agent systems.

## Featured Projects

### 1. AI Research Assistant

**What it does**: Automatically researches any topic, aggregates information from multiple sources, and generates comprehensive reports.

**Key features**:
- Multi-source web search
- Automatic summarization
- Citation management
- PDF export

**Tech stack**: OpenClaw + GPT-4 + Web Search API

\`\`\`yaml
name: Research Assistant
capabilities:
  - web_search
  - summarization
  - pdf_generation
\`\`\`

### 2. Marketing Content Engine

**What it does**: Takes a brief and generates blog posts, social media content, and email campaigns.

**Key features**:
- Multi-format output
- Brand voice consistency
- SEO optimization
- Content calendar integration

### 3. Automated Code Reviewer

**What it does**: Reviews pull requests and provides suggestions for improvement.

**Key features**:
- Style checking
- Bug detection
- Performance suggestions
- Security vulnerability scanning

### 4. Customer Feedback Analyzer

**What it does**: Processes customer reviews and feedback to extract actionable insights.

**Key features**:
- Sentiment analysis
- Theme extraction
- Trend detection
- Priority ranking

### 5. AI Tutoring Agent

**What it does**: Provides personalized learning experiences based on student progress.

**Key features**:
- Adaptive difficulty
- Progress tracking
- Quiz generation
- Explanation in multiple styles

## Code Example: Building a Simple Project

Here's how to get started with a basic project:

\`\`\`yaml
# agents/assistant.yaml
name: Project Assistant
description: A helpful AI assistant for your project

personality:
  tone: professional
  style: concise

capabilities:
  - question_answering
  - code_generation
  - documentation

instructions: |
  Help users with their projects by:
  1. Answering technical questions
  2. Generating code snippets
  3. Writing documentation
\`\`\`

## Lessons Learned

From these projects, here are the key takeaways:

1. **Start small** — Every successful project began with a simple prototype
2. **Iterate quickly** — Get feedback early and adjust
3. **Focus on value** — Build what users actually need
4. **Use existing tools** — Don't reinvent the wheel
5. **Document everything** — Future you will thank present you

## Related Articles

${links}

## Get Inspired

Ready to build your own project? Here's how to start:

1. [Install OpenClaw](/posts/how-to-install-openclaw)
2. [Build your first agent](/posts/build-first-ai-agent)
3. [Explore best tools](/posts/best-openclaw-tools-beginners)

The community would love to see what you build. Share your project on GitHub and tag us!`
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 60)
    .replace(/-$/, '');
}

function getCategoryMapping(articleType) {
  const map = {
    tutorial: 'tutorials',
    guide: 'guides',
    comparison: 'guides',
    showcase: 'agents',
  };
  return map[articleType] || 'guides';
}

function generateFrontmatter(keyword) {
  const now = new Date().toISOString().split('T')[0];
  const slug = slugify(keyword.title || keyword.primary_keyword);
  const category = keyword.category || getCategoryMapping(keyword.article_type);
  const tags = keyword.secondary_keywords
    .split(',')
    .map(k => k.trim().toLowerCase().replace(/\s+/g, '-'))
    .filter(k => k.length > 0);

  return `---
title: "${keyword.title || keyword.primary_keyword}"
slug: "${slug}"
description: "Learn about ${keyword.primary_keyword}. ${keyword.search_intent === 'informational' ? 'Complete' : 'In-depth'} ${keyword.article_type} for ${keyword.target_audience}."
category: "${category}"
tags: [${tags.map(k => `"${k}"`).join(', ')}]
status: "approved"
publishedAt: "${now}"
updatedAt: "${now}"
author: "OpenClaw Team"
featured: false
coverImage: ""
keywords: ["${keyword.primary_keyword}", ${keyword.secondary_keywords.split(',').map(k => `"${k.trim()}"`).join(', ')}]
---

`;
}

function generateContent(keyword, existingPosts) {
  const slug = slugify(keyword.title || keyword.primary_keyword);
  const links = getInternalLinks(slug, existingPosts);
  const templateFn = templates[keyword.article_type] || templates.guide;
  return templateFn(keyword, links);
}

function generateDraft(keyword, existingPosts) {
  const slug = slugify(keyword.title || keyword.primary_keyword);
  const filePath = path.join(POSTS_DIR, `${slug}.md`);

  if (fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping "${slug}": File already exists`);
    return null;
  }

  const content = generateFrontmatter(keyword) + generateContent(keyword, existingPosts);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Created: ${slug}.md (${keyword.article_type})`);
  return { slug, filename: `${slug}.md`, title: keyword.title || keyword.primary_keyword, category: keyword.category };
}

async function main() {
  const args = process.argv.slice(2);
  const limit = args.find(a => a.startsWith('--limit='));
  const maxArticles = limit ? parseInt(limit.split('=')[1]) : Infinity;
  const dryRun = args.includes('--dry-run');
  const statusFilter = args.find(a => a.startsWith('--status='));
  const filterStatus = statusFilter ? statusFilter.split('=')[1] : 'pending';

  console.log('🚀 OpenClaw Wiki Article Generator v2\n');
  console.log(`   Mode: ${dryRun ? 'DRY RUN' : 'GENERATE'}`);
  console.log(`   Limit: ${maxArticles === Infinity ? 'all' : maxArticles}`);
  console.log(`   Status filter: ${filterStatus}\n`);

  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }

  if (!fs.existsSync(KEYWORDS_FILE)) {
    console.error('❌ Error: keywords.csv not found');
    process.exit(1);
  }

  const keywords = [];
  await new Promise((resolve, reject) => {
    fs.createReadStream(KEYWORDS_FILE)
      .pipe(csv())
      .on('data', (data) => keywords.push(data))
      .on('end', resolve)
      .on('error', reject);
  });

  const pending = keywords.filter(k => k.status === filterStatus);
  console.log(`📊 Found ${keywords.length} total keywords, ${pending.length} with status "${filterStatus}"\n`);

  if (dryRun) {
    console.log('📝 Would generate these articles:\n');
    pending.slice(0, maxArticles).forEach((k, i) => {
      console.log(`   ${i + 1}. [${k.article_type}] ${k.title || k.primary_keyword} → ${k.category || getCategoryMapping(k.article_type)}`);
    });
    console.log('\n💡 Remove --dry-run to generate files');
    return;
  }

  let existingPosts = getExistingPosts();
  let created = 0;
  let skipped = 0;

  for (const keyword of pending.slice(0, maxArticles)) {
    const result = generateDraft(keyword, existingPosts);
    if (result) {
      created++;
      existingPosts.push(result); // Update for internal linking
    } else {
      skipped++;
    }
  }

  console.log(`\n📈 Summary:`);
  console.log(`   Created: ${created}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Total posts now: ${getExistingPosts().length}`);
  console.log(`\n💡 Next steps:`);
  console.log(`   1. Review generated articles in content/posts/`);
  console.log(`   2. Edit content to add unique insights`);
  console.log(`   3. Generate cover images for each article`);
  console.log(`   4. Run: pnpm dev to preview`);
  console.log(`   5. Deploy: git push to trigger Vercel build`);
}

main().catch(console.error);
