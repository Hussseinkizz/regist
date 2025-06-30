# vite-setup

A robust TypeScript library boilerplate built with Vite, featuring comprehensive development tooling and automated workflows.

## How To Use?

To use this template or setup make sure to do some house cleaning first, update the following files with the right info:

- package.json -- the github links, package name etc.
- License file -- to whatever type of license you want.
- Readme file -- yes this very one you reading, correct instructions as per your lib
- index.html file if any, perhaps the head part and meta tags!

> Note: don't touch the scripts section unless you really should.

## Features

- 🏗️ **Built with Vite & TypeScript** - Modern build tooling with type safety
- 🧪 **Testing** - Configured with Vitest for unit testing and coverage reports
- 📦 **Size Limits** - Enforced bundle size limits with `size-limit`
- 🔄 **Automated Versioning** - Using `changesets` for version management
- 🎨 **Code Quality**
  - ESLint for code linting
  - Prettier for consistent code formatting
  - TypeScript strict mode enabled
- ✅ **Quality Checks**
  - Export validation with `@arethetypeswrong/cli`
  - Automated CI/CD with GitHub Actions
  - Pre-commit and version hooks
- 📊 **Bundle Analysis** - Size analysis with detailed reports

## Installation

```bash
npm install vite-setup
# or
yarn add vite-setup
# or
pnpm add vite-setup
```

## Usage

```typescript
import { yourFunction } from 'vite-setup';

// Your usage example here
```

## Development Scripts

| Script               | Description                   |
| -------------------- | ----------------------------- |
| `pnpm build`         | Build the library             |
| `pnpm test`          | Run tests                     |
| `pnpm test:watch`    | Run tests in watch mode       |
| `pnpm test:coverage` | Generate test coverage report |
| `pnpm type-check`    | Run TypeScript type checking  |
| `pnpm lint`          | Lint the codebase             |
| `pnpm format`        | Format code with Prettier     |
| `pnpm size`          | Check bundle size             |
| `pnpm size:analyze`  | Analyze bundle size in detail |
| `pnpm check-exports` | Validate package exports      |
| `pnpm ci`            | Run all CI checks             |

## Development Workflow

1. Make your changes
2. Run quality checks:

   ```bash
   pnpm type-check
   pnpm lint
   pnpm test
   ```

3. Create a changeset (for version management):

   ```bash
   pnpm changeset
   ```

4. Commit changes and push

## Bundle Size Limits

Current limits are set to:

- ES Module: 10kb
- UMD Bundle: 10kb

Configure limits in `package.json` under `size-limit` section.

## Environment Requirements

- Node.js >=18
- pnpm 8.0.0 or higher

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## Quality Checks

Before each release, the following checks are automatically run:

- TypeScript type checking
- ESLint validation
- Unit tests
- Export validation
- Bundle size checks

## License

MIT License - see the [LICENSE](LICENSE) file for details

## Support

- Issues: [GitHub Issues](https://github.com/yourusername/vite-setup/issues)
- Discussions: [GitHub Discussions](https://github.com/yourusername/vite-setup/discussions)

## Acknowledgments

This template includes configurations and tooling inspired by modern JavaScript library development best practices.

---

Built with ❤️ using Vite, TypeScript And A Bunch Of Cool Lovely Little Tools. Looking to improve? PRs and suggestions are welcome!
