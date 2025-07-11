<script module lang="ts">
	import MagneticLine from '@components/MagneticLine/MagneticLine.svelte';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Component/MagneticLine',
		component: MagneticLine,
		tags: ['autodocs'],
		argTypes: {
			startPoint: { control: 'object' },
			endPoint: { control: 'object' },
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
		startPoint: { x: 50, y: 50 },
		endPoint: { x: 250, y: 150 },
		showStartArrow: true,
		showEndArrow: true
	}}
/>
