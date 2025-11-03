# Model Context

This document provides essential context for AI models working on the Cobra Security codebase.

## Architecture Overview

Cobra Security is designed as a modular, plugin-based security scanning platform:

```
┌─────────────────────────────────────────┐
│           CLI Interface                 │
├─────────────────────────────────────────┤
│  Scanner Registry (Terraform, K8s, etc) │
├─────────────────────────────────────────┤
│  AI Reasoning Engine (LLM Integration)  │
├─────────────────────────────────────────┤
│  Results Correlation & Prioritization   │
├─────────────────────────────────────────┤
│  Remediation Suggestions                │
└─────────────────────────────────────────┘
```
