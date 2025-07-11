<script module lang="ts">
	import MagneticLine from './MagneticLine.svelte';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'UI/MagneticLine',
		component: MagneticLine,
		tags: ['autodocs'],
		argTypes: {
			startPoint: { control: 'object' },
			endPoint: { control: 'object' },
			showStartArrow: { control: 'boolean' },
			showEndArrow: { control: 'boolean' },
		},
	});
</script>

<Story name="Default" args={{ startPoint: { x: 50, y: 50 }, endPoint: { x: 200, y: 50 }, showStartArrow: false, showEndArrow: false }}>
	<div style="position: relative; height: 400px;">
		<MagneticLine startPoint={{ x: 50, y: 50 }} endPoint={{ x: 200, y: 50 }} />
	</div>
</Story>

<Story name="WithStartArrow" args={{ startPoint: { x: 50, y: 50 }, endPoint: { x: 200, y: 50 }, showStartArrow: true, showEndArrow: false }}>
	<div style="position: relative; height: 400px;">
		<MagneticLine startPoint={{ x: 50, y: 50 }} endPoint={{ x: 200, y: 50 }} showStartArrow />
	</div>
</Story>

<Story name="WithEndArrow" args={{ startPoint: { x: 50, y: 50 }, endPoint: { x: 200, y: 50 }, showStartArrow: false, showEndArrow: true }}>
	<div style="position: relative; height: 400px;">
		<MagneticLine startPoint={{ x: 50, y: 50 }} endPoint={{ x: 200, y: 50 }} showEndArrow />
	</div>
</Story>

<Story name="WithBothArrows" args={{ startPoint: { x: 50, y: 50 }, endPoint: { x: 200, y: 50 }, showStartArrow: true, showEndArrow: true }}>
	<div style="position: relative; height: 400px;">
		<MagneticLine startPoint={{ x: 50, y: 50 }} endPoint={{ x: 200, y: 50 }} showStartArrow showEndArrow />
	</div>
</Story>

<Story name="AngledLine" args={{ startPoint: { x: 50, y: 50 }, endPoint: { x: 200, y: 50 }, showStartArrow: true, showEndArrow: true }}>
	<div style="position: relative; height: 400px;">
		<MagneticLine startPoint={{ x: 50, y: 50 }} endPoint={{ x: 200, y: 50 }} showStartArrow showEndArrow />
	</div>
</Story>