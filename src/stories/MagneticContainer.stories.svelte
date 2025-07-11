<script module lang="ts">
	import MagneticContainer from '@components/MagneticContainer/MagneticContainer.svelte';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { SHAPE } from '@components/MagneticContainer/constance.svelte';

	const { Story } = defineMeta({
		title: 'Component/MagneticContainer',
		component: MagneticContainer,
		tags: ['autodocs']
	});
</script>

<Story name="Rectangle">
	<div style="padding: 5rem; display: flex; justify-content: center; align-items: center;">
		<MagneticContainer shape={SHAPE.RECTANGLE}></MagneticContainer>
	</div>
</Story>

<Story name="Circle">
	<div style="padding: 5rem; display: flex; justify-content: center; align-items: center;">
		<MagneticContainer shape={SHAPE.CIRCLE}></MagneticContainer>
	</div>
</Story>

<Story name="Diamond">
	<div style="padding: 5rem; display: flex; justify-content: center; align-items: center;">
		<MagneticContainer shape={SHAPE.DIAMOND}></MagneticContainer>
	</div>
</Story>

<Story name="MagneticDiamond">
	<div style="padding: 5rem; display: flex; justify-content: center; align-items: center;">
		<MagneticContainer shape={SHAPE.DIAMOND} magnetic={true}></MagneticContainer>
	</div>
</Story>

<Story name="Triangle">
	<div style="padding: 5rem; display: flex; justify-content: center; align-items: center;">
		<MagneticContainer shape={SHAPE.TRIANGLE}></MagneticContainer>
	</div>
</Story>

<Story name="MagneticTriangle">
	<div style="padding: 5rem; display: flex; justify-content: center; align-items: center;">
		<MagneticContainer shape={SHAPE.TRIANGLE} magnetic={true}></MagneticContainer>
	</div>
</Story>

<Story name="MagneticRectangle">
	<div style="padding: 5rem; display: flex; justify-content: center; align-items: center;">
		<MagneticContainer shape={SHAPE.RECTANGLE} magnetic={true}></MagneticContainer>
	</div>
</Story>

<Story name="MagneticCircle">
	<div style="padding: 5rem; display: flex; justify-content: center; align-items: center;">
		<MagneticContainer shape={SHAPE.CIRCLE} magnetic={true}></MagneticContainer>
	</div>
</Story>

<Story name="Pentagon">
	<div style="padding: 5rem; display: flex; justify-content: center; align-items: center;">
		<MagneticContainer shape={SHAPE.PENTAGON}></MagneticContainer>
	</div>
</Story>

<Story name="MagneticPentagon">
	<div style="padding: 5rem; display: flex; justify-content: center; align-items: center;">
		<MagneticContainer shape={SHAPE.PENTAGON} magnetic={true}></MagneticContainer>
	</div>
</Story>
