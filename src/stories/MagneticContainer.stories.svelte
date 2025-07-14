<script module lang="ts">
	import type { MagneticContainerProps } from '@components/MagneticContainer/types';
	import MagneticContainer from '@components/MagneticContainer/MagneticContainer.svelte';
	import { SHAPE } from '@components/MagneticContainer/constance.svelte';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Component/MagneticContainer',
		component: MagneticContainer,
		tags: ['autodocs'],
		argTypes: {
			shape: {
				control: {
					type: 'select',
					options: Object.values(SHAPE)
				}
			},
			initialWidth: {
				control: {
					type: 'number'
				}
			},
			initialHeight: {
				control: {
					type: 'number'
				}
			},
			magnetic: {
				control: {
					type: 'boolean'
				}
			}
		}
	});

	const args: MagneticContainerProps = {
		shape: SHAPE.RECTANGLE,
		initialWidth: 150,
		initialHeight: 150,
		id: 'test',
		magnetic: true
	};
</script>

<Story name="Complete" {args}>
</Story>
