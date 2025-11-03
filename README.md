# 🐍 COBRA

**"Crime is a disease. I'm the cure." — Lt. Marion Cobretti (1986)**

---

## ⚔️ Overview

**COBRA** is an **AI-augmented cybersecurity and developer productivity platform** — your personal **Sentinel + DevGuard** hybrid.

It detects, explains, and helps you fix security weaknesses across your infrastructure, code, and cloud setup — before they reach production.

Where traditional scanners flood you with noise, COBRA thinks.  
It correlates vulnerabilities, reasons about their real impact, and speaks in human language.  
It's your on-demand _security partner_, not another report generator.

---

## 💡 Core Mission

> Build a pragmatic, intelligent system that helps developers **build secure software by default** — with zero excuses.

COBRA is built for engineers who live in the terminal, automate everything, and believe real security comes from **understanding, not bureaucracy.**

---

## 🧩 Components

| Component                   | Description                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Sentinel Core**           | The data brain — collects, normalizes, and correlates findings from scanners, pipelines, and cloud telemetry. |
| **DevGuard CLI**            | Your frontline command interface — runs scans, enforces policies, and talks back with AI explanations.        |
| **Policy Packs (OPA/Rego)** | Your rulebook. Define what "secure" means for Terraform, Kubernetes, and CI pipelines.                        |
| **AI Reasoner**             | An on-device or API-based LLM layer that explains, prioritizes, and proposes minimal, safe fixes.             |
| **Integrations**            | GitHub Actions, CloudTrail, GuardDuty, GHAS — wherever your code or cloud lives, COBRA watches.               |

---

## 🚀 Quickstart

```bash
# Clone
git clone https://github.com/roman-sachenko/cobra-security
cd cobra-security

# Install deps
pnpm install

# Run help
pnpm dev
# or after linking globally
cobra --help

# Try placeholder scan
cobra scan --target ./infra
```

## 🛠️ Development

```bash
# Run in development mode
pnpm dev

# Lint code
pnpm lint

# Auto-fix linting issues
pnpm lint:fix

# Format code
pnpm format

# Check code formatting
pnpm format:check

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Security audit
pnpm security:audit
```

## 📋 CLI Commands

- `cobra scan --target <path>` - Scan a directory for security issues
- `cobra --help` - Show all available commands


## 📄 License

MIT
