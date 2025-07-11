# Lantau Components

This project focuses on the components used for managing the UI components in the Lantau project.

## Development

To get started with development, install the dependencies and start the development server. This project uses pnpm for package management.

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

### Storybook

We use Storybook for component development and visualization.

```bash
# Run storybook
pnpm storybook
```

## Building

To create a production build of the component library:

```bash
pnpm build
```

## Testing

This project uses Vitest for unit testing.

```bash
# Run all tests
pnpm test

# Run unit tests in watch mode
pnpm test:unit
```

## Linting and Formatting

To ensure code quality, you can run the linter and code formatter.

```bash
# Check for linting and formatting issues
pnpm lint

# Fix formatting issues
pnpm format
```

## Project Guides

### Coding Guidelines

Based on the patterns established in the `MagneticLine` component, the following guidelines should be followed for all new components.

#### 1. File Structure

Each component should be self-contained within its own directory under `src/UI/`. The structure should be as follows:

-   `ComponentName/`
    -   `ComponentName.svelte`: The main Svelte component file containing the script logic and template.
    -   `ComponentName.css`: The stylesheet for the component.
    -   `types.d.ts`: TypeScript definitions for the component's props.

#### 2. TypeScript and Svelte 5

-   **TypeScript:** All components must use TypeScript (`<script lang="ts">`).
-   **Type Definitions:** Define component props in a dedicated `types.d.ts` file and import the type. This keeps the component file clean and types reusable.
-   **Svelte 5 Runes:** Utilize Svelte 5 runes for state and reactivity (`$props`, `$state`, `$derived`).

#### 3. Component Script Organization

Organize the `<script>` tag into logical, commented sections to improve readability. The sections must follow this specific order:

1.  **Props Handling**
2.  **Derived State**
3.  **State Handling** (including both reactive `$state` and non-reactive `let` variables)
4.  **Event Handling**
5.  **Lifecycle Management**

Use the following comment style to delineate each section:

`//*** start of [SECTION NAME] ***//`
...
`//*** end of [SECTION NAME] ***//`

**Example:**

```svelte
<script lang="ts">
	//*** start of imports ***//
	import type { ComponentProps } from './types.d.ts';
	import { onDestroy } from 'svelte';
	//*** end of imports ***//

	//*** start of props handing ***//
	let {
		// ... props
	}: ComponentProps = $props();
	//*** end of props handing ***//

	//*** start of derived state ***//
	let derivedValue = $derived.by(() => {
		// ...some calculation from props
	});
	//*** end of derived state ***//

	//*** start of state handling ***//
	let someState = $state(0);
	let isSomething = false; // non-reactive state
	//*** end of state handling ***//

	//*** start of event handling ***//
	function handleClick() {
		// ...
	}
	//*** end of event handling ***//

	//*** start of lifecycle management ***//
	onDestroy(() => {
		// ...
	});
	//*** end of lifecycle management ***/
</script>

<style src="./ComponentName.css"></style>
```

#### 4. Props Best Practices

-   **Documentation:** Use JSDoc to document all props, explaining their purpose and type.
-   **Defaults:** Provide sensible default values for all optional props.
-   **Callbacks:** Use function props (e.g., `onPointsChange`) to communicate events and data back up to parent components.

#### 5. Styling

-   Keep styles in a separate `.css` file and link to it using the `<style src="./ComponentName.css"></style>` tag at the bottom of the Svelte file. This is the preferred method for component styling.
-   Use clear and descriptive CSS class names to avoid conflicts.

#### 6. Lifecycle and Memory Management

-   Always clean up side effects in the `onDestroy` lifecycle hook. This includes removing global event listeners or clearing timers (`setInterval`).

#### 7. Accessibility (A11y)

-   Ensure all interactive elements are accessible. If using non-semantic elements like `div` for buttons, add `role="button"` and `tabindex="0"`.

## Project TODO List

- [ ] Setup auto testing
- [ ] Update the production build for the components
- [ ] Guideline for how to use the built components
- [ ] Config for building the component as web component
