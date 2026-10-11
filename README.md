# DevTokens — Accessible Design Token Studio

> Fast, offline browser tool to generate, inspect, and export accessible design tokens in CSS and TypeScript format with real-time WCAG 2.2 contrast validation.

## Features
- **WCAG 2.2 Contrast Validation:** Computes relative luminance and contrast ratios against light (#ffffff) and dark (#0f172a) backgrounds in real time.
- **Export Formats:** Exports standard CSS custom properties (`:root`) and type-safe TypeScript configuration objects.
- **Zero Third-Party Telemetry:** Runs 100% in-browser on the client side without cookies, tracking, or network calls.

## Getting Started

### Prerequisites
- Node.js >= 24.0.0
- pnpm >= 12.0.0

### Development
```bash
# Install dependencies
pnpm install

# Start local Vite development server
pnpm dev
```

### Production Build
```bash
# Run type checks and build static output
pnpm typecheck
pnpm build

# Preview production build locally
pnpm preview
```

### Running Tests
```bash
pnpm test
```

## License
MIT License. Copyright (c) 2026 Project Foundry.
