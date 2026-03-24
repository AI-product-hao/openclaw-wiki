---
title: "OpenClaw Docker Installation Tutorial"
slug: "openclaw-docker-installation"
description: "Learn how to install and run OpenClaw using Docker. Step-by-step tutorial covering Docker setup, container configuration, and production deployment."
category: "tutorials"
tags: ["docker", "installation", "containers", "deployment"]
status: "approved"
publishedAt: "2026-03-19"
updatedAt: "2026-03-19"
author: "OpenClaw Team"
featured: false
coverImage: ""
keywords: ["OpenClaw Docker", "openclaw docker installation", "docker setup openclaw", "containerize openclaw"]
---

## Introduction

Running OpenClaw with Docker is the fastest and most reliable way to get started with AI agent development. Docker eliminates the "it works on my machine" problem by packaging OpenClaw and all its dependencies into a single, portable container.

In this OpenClaw Docker installation tutorial, you'll learn how to set up OpenClaw in Docker from scratch, configure it for development and production, and avoid common pitfalls that trip up beginners.

Whether you're using Windows, macOS, or Linux, Docker gives you a consistent environment every time. Let's get started.

## Why Use Docker for OpenClaw?

Before diving into the installation steps, here's why Docker is the recommended approach for many teams:

| Benefit | Description |
|---------|-------------|
| **Consistent environment** | Same setup on every machine, no dependency conflicts |
| **Easy cleanup** | Remove everything with one command, no leftover files |
| **Version control** | Pin exact OpenClaw versions, rollback instantly |
| **Production ready** | Same container runs in dev and production |
| **Team collaboration** | Share your exact setup via `docker-compose.yml` |
| **Isolation** | OpenClaw runs in its own space, won't affect your system |

If you're new to OpenClaw, you might want to read [What is OpenClaw?](/posts/what-is-openclaw) first to understand the platform before setting up Docker.

## Prerequisites

You need two things installed on your system:

### 1. Docker Engine

Check if Docker is already installed:

```bash
docker --version
# Expected output: Docker version 24.x or higher
```

If not installed, download Docker Desktop from [docker.com](https://www.docker.com/products/docker-desktop/):

- **Windows**: Download Docker Desktop for Windows (requires WSL2)
- **macOS**: Download Docker Desktop for Mac (Intel or Apple Silicon)
- **Linux**: Install via your package manager

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install docker.io docker-compose-plugin

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker
```

### 2. Docker Compose (Optional but Recommended)

Docker Compose simplifies multi-container setups. It comes bundled with Docker Desktop. Verify:

```bash
docker compose version
# Expected output: Docker Compose version v2.x
```

## Step-by-Step Docker Installation

### Step 1: Pull the OpenClaw Docker Image

The official OpenClaw image is available on Docker Hub:

```bash
# Pull the latest stable version
docker pull openclaw/openclaw:latest

# Or pull a specific version (recommended for production)
docker pull openclaw/openclaw:1.5.0
```

Verify the image was downloaded:

```bash
docker images | grep openclaw
```

### Step 2: Run OpenClaw in a Container

Start a basic OpenClaw container:

```bash
docker run -d \
  --name openclaw-agent \
  -p 3000:3000 \
  -e OPENAI_API_KEY=your-api-key-here \
  openclaw/openclaw:latest
```

Let's break down what each flag does:

| Flag | Purpose |
|------|---------|
| `-d` | Run in background (detached mode) |
| `--name openclaw-agent` | Give the container a memorable name |
| `-p 3000:3000` | Map port 3000 from container to your machine |
| `-e OPENAI_API_KEY=...` | Pass your API key as an environment variable |

Now visit `http://localhost:3000` in your browser. You should see the OpenClaw dashboard.

### Step 3: Verify the Installation

Check that the container is running:

```bash
# View running containers
docker ps

# Check container logs
docker logs openclaw-agent

# Test the API endpoint
curl http://localhost:3000/api/health
```

Expected health check response:

```json
{
  "status": "ok",
  "version": "1.5.0",
  "uptime": "2m 30s"
}
```

## Using Docker Compose (Recommended)

For real projects, Docker Compose is much easier to manage than raw `docker run` commands. Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  openclaw:
    image: openclaw/openclaw:latest
    container_name: openclaw-agent
    ports:
      - "3000:3000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - OPENCLAW_ENV=development
      - OPENCLAW_LOG_LEVEL=info
    volumes:
      - ./agents:/app/agents        # Your agent configurations
      - ./skills:/app/skills        # Custom skills
      - ./data:/app/data            # Persistent data
    restart: unless-stopped

  # Optional: Add Redis for caching
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data

volumes:
  redis-data:
```

Create a `.env` file for your secrets:

```bash
# .env (never commit this to Git!)
OPENAI_API_KEY=sk-your-key-here
```

Start everything with one command:

```bash
docker compose up -d
```

Stop everything:

```bash
docker compose down
```

## Mounting Your Agent Files

One of Docker's best features is **volumes** — they let you edit files on your host machine while the container uses them in real time.

```bash
# Mount your local agents directory
docker run -d \
  --name openclaw-agent \
  -p 3000:3000 \
  -v $(pwd)/agents:/app/agents \
  -v $(pwd)/skills:/app/skills \
  -e OPENAI_API_KEY=your-key \
  openclaw/openclaw:latest
```

Now you can edit files in `./agents/` with VS Code, and changes are reflected immediately inside the container.

This is how most developers use OpenClaw Docker during development. For more on configuring agents, check out [How to Build Your First AI Agent](/posts/build-first-ai-agent).

## Building a Custom Docker Image

If you need custom dependencies or configurations, create your own Dockerfile:

```dockerfile
# Dockerfile
FROM openclaw/openclaw:latest

# Install additional tools
RUN npm install -g typescript

# Copy your custom configuration
COPY config.yaml /app/config.yaml
COPY agents/ /app/agents/
COPY skills/ /app/skills/

# Set default environment
ENV OPENCLAW_ENV=production
ENV OPENCLAW_PORT=3000

# Expose the port
EXPOSE 3000

# Start OpenClaw
CMD ["openclaw", "start"]
```

Build and run your custom image:

```bash
# Build the image
docker build -t my-openclaw-agent .

# Run it
docker run -d --name my-agent -p 3000:3000 my-openclaw-agent
```

## Common Docker Issues and Fixes

### Issue 1: Container Won't Start

```bash
# Check the logs for error messages
docker logs openclaw-agent

# Common fix: ensure the port isn't already in use
lsof -i :3000
# Kill the process using the port, then retry
```

### Issue 2: Permission Denied on Volumes

On Linux, you may need to match the container user's UID:

```bash
docker run -d \
  --name openclaw-agent \
  --user $(id -u):$(id -g) \
  -v $(pwd)/agents:/app/agents \
  openclaw/openclaw:latest
```

### Issue 3: API Key Not Working

Environment variables must be passed correctly:

```bash
# ❌ Wrong: quotes around the value
-e OPENAI_API_KEY="sk-key"

# ✅ Correct: no extra quotes
-e OPENAI_API_KEY=sk-key

# ✅ Also correct: using .env file with docker compose
docker compose --env-file .env up -d
```

### Issue 4: Container Uses Too Much Memory

Limit resources:

```bash
docker run -d \
  --name openclaw-agent \
  --memory=512m \
  --cpus=1 \
  openclaw/openclaw:latest
```

## Docker vs Other Installation Methods

Wondering whether Docker is right for you? Here's a quick comparison:

| Method | Best For | Setup Time | Isolation | Production Ready |
|--------|----------|-----------|-----------|-----------------|
| **Docker** | Teams, CI/CD, production | 5 min | ✅ Full | ✅ Yes |
| **npm global** | Quick local testing | 2 min | ❌ No | ⚠️ Depends |
| **From source** | Contributors, customization | 15 min | ❌ No | ⚠️ Depends |
| **pnpm** | Node.js ecosystem users | 2 min | ❌ No | ⚠️ Depends |

For a detailed guide on the npm installation method, see our [How to Install OpenClaw Step by Step](/posts/how-to-install-openclaw) article.

## Useful Docker Commands for OpenClaw

Here's a cheat sheet of commands you'll use regularly:

```bash
# Start the container
docker start openclaw-agent

# Stop the container
docker stop openclaw-agent

# Restart the container
docker restart openclaw-agent

# View real-time logs
docker logs -f openclaw-agent

# Execute a command inside the container
docker exec -it openclaw-agent bash

# Check resource usage
docker stats openclaw-agent

# Remove the container (stops it first)
docker rm -f openclaw-agent

# Remove the image
docker rmi openclaw/openclaw:latest

# Update to latest version
docker pull openclaw/openclaw:latest
docker rm -f openclaw-agent
docker run -d --name openclaw-agent -p 3000:3000 openclaw/openclaw:latest
```

## FAQ

**Q: Can I run multiple OpenClaw agents in separate containers?**

A: Yes! Just use different container names and port mappings. For example, `-p 3001:3000` for the second agent and `-p 3002:3000` for the third.

**Q: How do I update OpenClaw in Docker?**

A: Pull the new image with `docker pull openclaw/openclaw:latest`, stop the old container, and start a new one. Your data is preserved if you use volumes.

**Q: Is Docker required to use OpenClaw?**

A: No, Docker is optional. You can install OpenClaw directly via npm. But Docker is recommended for production deployments and team environments.

**Q: How much disk space does the OpenClaw Docker image need?**

A: The base image is approximately 300-500MB. Custom images with additional dependencies may be larger.

**Q: Can I use Docker on Windows without WSL2?**

A: Docker Desktop for Windows requires WSL2 for the best experience. Legacy Hyper-V mode is available but not recommended for performance reasons.

## Related Articles

- [What Is OpenClaw? Complete Beginner Guide](/posts/what-is-openclaw)
- [How to Install OpenClaw Step by Step](/posts/how-to-install-openclaw)
- [Build Your First AI Agent with OpenClaw](/posts/build-first-ai-agent)
- [Best OpenClaw Tools for Beginners](/posts/best-openclaw-tools-beginners)

## Conclusion

You've learned how to install and run OpenClaw using Docker — from pulling the official image to building custom Dockerfiles for production. Docker gives you a clean, reproducible environment that works the same everywhere.

The key takeaways:
- Use `docker compose` for real projects (not raw `docker run`)
- Always use volumes to persist your agent configurations
- Never hardcode API keys — use `.env` files
- Pin specific image versions in production

Ready for the next step? [Build your first AI agent](/posts/build-first-ai-agent) and start automating with OpenClaw!
