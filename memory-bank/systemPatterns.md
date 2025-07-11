# System Patterns

This document outlines the recurring architectural and design patterns used throughout the project. It serves as a reference for maintaining consistency and ensuring that development follows established best practices.

2025-11-07 21:57:18 - Log of updates made will be appended as footnotes to the end of this file.

*

## Patterns

* **Component-Based Architecture:** The project is built using Svelte components, promoting reusability and modularity. Each component is self-contained and responsible for its own logic and presentation.
* **Storybook for UI Development:** All components are developed and documented using Storybook. This allows for isolated development, testing, and visual review of each component.
* **Coding Guidelines:** Detailed coding guidelines are maintained in the `README.md` file, which is the single source of truth for all coding standards.
* **Path Aliases:** The `@components/` alias must be used for all imports of resources within the `src/UI` directory. This is configured in `tsconfig.json` and documented in `README.md`.

[2025-07-11 22:04:17] - Refactored to remove redundant guidelines and point to `README.md` as the source of truth to avoid conflicts.
[2025-07-11 22:55:34] - Updated to include guideline on using path aliases for all resources under `src/UI`.
