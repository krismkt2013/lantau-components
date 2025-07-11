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

<Story name="Diamond">
	<div style="padding: 5rem; display: flex; justify-content: center; align-items: center;">
		<MagneticContainer shape={SHAPE.DIAMOND}>
			<button>Hover over me</button>
		</MagneticContainer>
	</div>
</Story>

<Story name="MagneticDiamond">
	<div style="padding: 5rem; display: flex; justify-content: center; align-items: center;">
		<MagneticContainer shape={SHAPE.DIAMOND} magnetic={true}>
			<button>Hover over me</button>
		</MagneticContainer>
	</div>
</Story>

<Story name="Triangle">
	<div style="padding: 5rem; display: flex; justify-content: center; align-items: center;">
		<MagneticContainer shape={SHAPE.TRIANGLE}>
			<button>Hover over me</button>
		</MagneticContainer>
	</div>
</Story>

<Story name="MagneticTriangle">
	<div style="padding: 5rem; display: flex; justify-content: center; align-items: center;">
		<MagneticContainer shape={SHAPE.TRIANGLE} magnetic={true}>
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

<Story name="Pentagon">
	<div style="padding: 5rem; display: flex; justify-content: center; align-items: center;">
		<MagneticContainer shape={SHAPE.PENTAGON}>
			<button>Hover over me</button>
		</MagneticContainer>
	</div>
</Story>

<Story name="MagneticPentagon">
	<div style="padding: 5rem; display: flex; justify-content: center; align-items: center;">
		<MagneticContainer shape={SHAPE.PENTAGON} magnetic={true}>
			<button>Hover over me</button>
		</MagneticContainer>
	</div>
</Story>
