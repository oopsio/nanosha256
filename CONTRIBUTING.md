# Contributing to nanosha256

Thank you for your interest in contributing to **nanosha256**! We welcome contributions that improve the library's performance, safety, and documentation.

## How to Contribute

### 1. Reporting Bugs
- Use the **Bug Report** issue template.
- Include a minimal reproduction case in C.
- Describe the expected vs. actual behavior.

### 2. Feature Requests
- Use the **Feature Request** issue template.
- Explain the use case and why this should be part of a "minimal" library.

### 3. Pull Requests
- Follow the existing **Pure C99** coding style.
- Ensure all tests pass by running `make clean test`.
- Document any new API changes in `docs/content/`.
- If performance is affected, include benchmark results.

## Style Guidelines
- Use **4 spaces** for indentation.
- Keep comments concise and follow the Doxygen-ready style if applicable.
- Avoid any C++ features or external dependencies in the source.

## Documentation
Documentation is built using Bun and SWC. If you update the documentation content in `docs/content/`, please run `make docs` to verify the generated HTML.

---
By contributing, you agree that your contributions will be licensed under the project's **MIT License**.
