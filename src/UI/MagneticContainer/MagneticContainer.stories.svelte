<script module lang="ts">
	import MagneticContainer from './MagneticContainer.svelte';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { SHAPE } from './constance.svelte';

	const { Story } = defineMeta({
		title: 'UI/MagneticContainer',
		component: MagneticContainer,
		tags: ['autodocs']
	});
</script>

<Story name="Rectangle">
	<div style="padding: 5rem; display: flex; justify-content: center; align-items: center;">
		<MagneticContainer shape={SHAPE.RECTANGLE}>
			<button>Hover over me</button>
		</MagneticContainer>
	</div>
</Story>

<Story name="Circle">
	<div style="padding: 5rem; display: flex; justify-content: center; align-items: center;">
		<MagneticContainer shape={SHAPE.CIRCLE}>
			<button>Hover over me</button>
		</MagneticContainer>
	</div>
</Story>

<Story name="MagneticRectangle">
	<div style="padding: 5rem; display: flex; justify-content: center; align-items: center;">
		<MagneticContainer shape={SHAPE.RECTANGLE} magnetic={true}>
			<button>Hover over me</button>
		</MagneticContainer>
	</div>
</Story>

<Story name="MagneticCircle">
	<div style="padding: 5rem; display: flex; justify-content: center; align-items: center;">
		<MagneticContainer shape={SHAPE.CIRCLE} magnetic={true}>
			<button>Hover over me</button>
		</MagneticContainer>
	</div>
</Story>
