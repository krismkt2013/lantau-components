<script module lang="ts">
	import MagneticLine from '@components/MagneticLine/MagneticLine.svelte';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Component/MagneticLine',
		component: MagneticLine,
		tags: ['autodocs'],
		argTypes: {
			initialStartPoint: { control: 'object' },
			initialEndPoint: { control: 'object' },
			showStartArrow: { control: 'boolean' },
			showEndArrow: { control: 'boolean' },
			onPointsChange: { action: 'onPointsChange' },
			id: { control: 'text' }
		}
	});
</script>

<Story
	name="Complete"
	args={{
		id: 'complete-line-story',
		initialStartPoint: { x: 50, y: 50 },
		initialEndPoint: { x: 250, y: 150 },
		showStartArrow: true,
		showEndArrow: true
	}}
/>
