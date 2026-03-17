---
title: "How to Install OpenClaw Step by Step"
slug: "how-to-install-openclaw"
description: "A complete step-by-step guide to installing OpenClaw on your system. Covers all platforms: Windows, macOS, and Linux."
category: "tutorials"
tags: ["installation", "setup", "beginner", "getting-started"]
status: "published"
publishedAt: "2026-03-14"
updatedAt: "2026-03-14"
author: "OpenClaw Team"
featured: true
coverImage: "/images/install-openclaw.png"
keywords: ["OpenClaw installation", "setup guide", "install OpenClaw", "getting started"]
---

## Introduction

This guide will walk you through the complete installation process for OpenClaw. Whether you're using Windows, macOS, or Linux, we've got you covered.

## Prerequisites

Before installing OpenClaw, ensure you have:

- **Node.js** version 18 or higher
- **npm** or **pnpm** or **yarn** package manager
- A code editor (VS Code recommended)
- Git (optional but recommended)

### Checking Prerequisites

Open your terminal and run:

```bash
node --version
npm --version
```

If you don't have Node.js installed, download it from [nodejs.org](https://nodejs.org/).

## Installation Methods

### Method 1: Using npm (Recommended)

The easiest way to install OpenClaw is using npm:

```bash
npm install -g openclaw
```

Verify the installation:

```bash
openclaw --version
```

### Method 2: Using pnpm

If you prefer pnpm:

```bash
pnpm add -g openclaw
```

### Method 3: Using Docker

For containerized environments:

```bash
docker pull openclaw/openclaw:latest
```

### Method 4: From Source

For developers who want to contribute or customize:

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw
npm install
npm run build
npm link
```

## Platform-Specific Instructions

### Windows

1. Open PowerShell or Command Prompt as Administrator
2. Run the npm installation command
3. Add OpenClaw to your PATH if needed:
   ```powershell
   setx PATH "%PATH%;%APPDATA%\npm"
   ```
4. Restart your terminal

### macOS

1. Open Terminal
2. If you don't have Homebrew, install it:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
3. Install Node.js via Homebrew:
   ```bash
   brew install node
   ```
4. Install OpenClaw:
   ```bash
   npm install -g openclaw
   ```

### Linux

#### Ubuntu/Debian

```bash
# Update package list
sudo apt update

# Install Node.js
sudo apt install nodejs npm

# Install OpenClaw
sudo npm install -g openclaw
```

#### CentOS/RHEL/Fedora

```bash
# Install Node.js
sudo dnf install nodejs npm

# Install OpenClaw
sudo npm install -g openclaw
```

#### Arch Linux

```bash
# Install Node.js
sudo pacman -S nodejs npm

# Install OpenClaw
sudo npm install -g openclaw
```

## Initial Configuration

After installation, configure OpenClaw:

1. **Initialize the configuration**:
   ```bash
   openclaw init
   ```

2. **Set up your API keys** (if using cloud AI providers):
   ```bash
   openclaw config set openai.api_key YOUR_API_KEY
   ```

3. **Verify configuration**:
   ```bash
   openclaw config list
   ```

## Creating Your First Project

Let's create a simple project to verify everything is working:

```bash
# Create a new project
openclaw new my-first-agent
cd my-first-agent

# Start the development server
openclaw dev
```

You should see output indicating the server is running on `http://localhost:3000`.

## Common Issues and Solutions

### Permission Denied (macOS/Linux)

If you get permission errors, you may need to fix npm permissions:

```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### Node Version Too Old

If you see a Node version error, upgrade Node.js:

```bash
# Using nvm (recommended)
nvm install 18
nvm use 18

# Or download from nodejs.org
```

### Port Already in Use

If port 3000 is taken, specify a different port:

```bash
openclaw dev --port 3001
```

### Windows Defender or Antivirus Warnings

Some antivirus software may flag OpenClaw. Add an exception for:
- The OpenClaw installation directory
- The `openclaw` executable

## Next Steps

Now that OpenClaw is installed, you're ready to:

1. **Build your first agent**: Follow our [beginner tutorial](/posts/build-first-ai-agent)
2. **Explore templates**: Check out the template gallery
3. **Read the docs**: Dive deeper into OpenClaw's features
4. **Join the community**: Connect with other users

## Updating OpenClaw

To update to the latest version:

```bash
npm update -g openclaw
```

Or reinstall:

```bash
npm uninstall -g openclaw
npm install -g openclaw
```

## Uninstalling OpenClaw

If you need to remove OpenClaw:

```bash
npm uninstall -g openclaw
```

## FAQ

**Q: Can I install OpenClaw without admin/sudo access?**

A: Yes, use a Node version manager like nvm or install locally in your project.

**Q: How much disk space does OpenClaw need?**

A: Approximately 500MB for the base installation, plus space for your projects.

**Q: Can I use OpenClaw offline?**

A: Yes, if you're using local AI models. Cloud providers require internet access.

**Q: Is there a GUI version?**

A: OpenClaw is primarily CLI-based, but web interfaces are available through community plugins.

## Conclusion

You now have OpenClaw installed and ready to go! The installation process is straightforward across all platforms. If you encounter any issues not covered here, check our [troubleshooting guide](/posts/troubleshooting) or reach out to the community.

Happy building!
