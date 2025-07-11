<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MagneticPad from '@components/MagneticPad/MagneticPad.svelte';
	// import MagneticContainer from '@components/MagneticContainer/MagneticContainer.svelte';
	// import MagneticLine from '@components/MagneticLine/MagneticLine.svelte';
	// import { SHAPE } from '@components/MagneticContainer/constance.svelte';

	const { Story } = defineMeta({
		title: 'Component/MagneticPad',
		component: MagneticPad,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	<div style="height: 500px; width: 500px">
		<MagneticPad></MagneticPad>
		<!-- <MagneticPad>
			<MagneticContainer id="c1" shape={SHAPE.RECTANGLE} magnetic={true}>
				<div style="width:100px; height:100px; background:red"></div>
			</MagneticContainer>
			<MagneticContainer id="c2" shape={SHAPE.CIRCLE} magnetic={true}>
				<div style="width:100px; height:100px; background:blue"></div>
			</MagneticContainer>
			<MagneticLine from="c1" to="c2" />
		</MagneticPad> -->
	</div>
</Story>
