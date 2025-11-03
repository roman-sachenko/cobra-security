# AI Usage Guide

This document outlines how AI tools (including Claude, ChatGPT, etc.) should be used when working with the Cobra Security codebase.

## Context

Cobra Security is an AI-augmented security platform. When using AI assistants to help develop this project:

1. **Share relevant context** - Always reference MODEL_CONTEXT.md for architectural decisions
2. **Security first** - Any AI-generated code should follow security best practices
3. **Modularity** - New features should be built as pluggable modules
4. **Documentation** - AI-assisted changes should include clear documentation

## Best Practices

- Review all AI-generated code before committing
- Ensure AI suggestions align with the project's security-first mission
- Use AI to accelerate development while maintaining code quality
- Leverage AI for vulnerability detection patterns and remediation suggestions

## Common Tasks

- **Adding new scanners**: Reference existing scanner interfaces
- **AI integration**: Follow the patterns in MODEL_CONTEXT.md
- **Security rules**: Ensure rules are deterministic and auditable
