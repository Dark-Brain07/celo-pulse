# Contributing to CeloPulse

Welcome to the CeloPulse development team! To maintain a professional and clean repository, please follow these guidelines.

## Branching Strategy

We follow a simplified GitFlow model:

- **main**: Production-ready code. Only merged via PR from `develop` or hotfix branches.
- **develop**: Integration branch for features.
- **feature/***: New features (e.g., `feature/gas-savings-ui`).
- **fix/***: Bug fixes (e.g., `fix/streak-logic`).
- **docs/***: Documentation updates.

## Commit Message Format
 
We use [Conventional Commits](https://www.conventionalcommits.org/) standards to maintain a highly readable release flow:
 
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

### Examples:
- `feat(ui): add auto-reload timer toggle to WalletStats`
- `fix(contracts): solve reentrancy edge case in claims pool`
- `docs(sdk): document return interfaces in airdrop SDK index`

## Pull Request Process
 
1. Create a new branch from `develop`.
2. Implement your changes and add necessary tests.
3. Ensure all tests pass (`npm test` in relevant packages).
4. Update the `CHANGELOG.md` with your changes.
5. Open a PR against `develop`.
6. At least one peer review is required before merging.

### Pull Request Checklist
Before submitting your PR, please verify:
- [ ] Code builds without errors (`npm run build` at monorepo root)
- [ ] No type-safety warnings (`npx tsc --noEmit` across packages)
- [ ] Clean git commit history conforming to conventional naming rules
- [ ] All new functions include standard JSDoc/NatSpec block comments

## Coding Standards

- **TypeScript**: Use strict typing where possible.
- **CSS**: Use vanilla CSS or Tailwind utility classes as defined in the project.
- **Solidity**: Follow the [Solidity Style Guide](https://docs.soliditylang.org/en/v0.8.20/style-guide.html). Ensure all contracts are compiled with ^0.8.20.

---

Thank you for contributing to the Celo ecosystem!
