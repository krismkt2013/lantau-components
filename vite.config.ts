import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		// Vitest projects allow running different test configurations in parallel.
		// See: https://vitest.dev/config/#projects
		projects: [
			// Project for client-side (browser) component tests
			{
				test: {
					name: 'client',
					environment: 'browser',
					browser: {
						enabled: true,
						provider: 'playwright',
						// You can add more browsers here for cross-browser testing
						// instances: [{ browser: 'chromium' }, { browser: 'firefox' }]
						instances: [{ browser: 'chromium' }]
					},
					// Run tests for Svelte components
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					// Exclude server-side code from client tests
					exclude: ['src/lib/server/**'],
					// Setup file for client-specific test environment (e.g., mocking)
					setupFiles: ['./vitest-setup-client.ts']
				}
			},
			// Project for server-side (Node.js) tests
			{
				test: {
					name: 'server',
					environment: 'node',
					// Run tests for all non-component files
					include: ['src/**/*.{test,spec}.{js,ts}'],
					// Exclude the Svelte component tests that are handled by the 'client' project
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
