<script module lang="ts">
	import MagneticContainer from './MagneticContainer.svelte';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Shape } from './constance.svelte';

	const { Story } = defineMeta({
		title: 'UI/MagneticContainer',
		component: MagneticContainer,
		tags: ['autodocs']
	});
</script>

<Story name="Rectangle">
	<div style="padding: 5rem; display: flex; justify-content: center; align-items: center;">
		<MagneticContainer shape={Shape.Rectangle}>
			<button>Hover over me</button>
		</MagneticContainer>
	</div>
</Story>

<Story name="Circle">
	<div style="padding: 5rem; display: flex; justify-content: center; align-items: center;">
		<MagneticContainer shape={Shape.Circle}>
			<button>Hover over me</button>
		</MagneticContainer>
	</div>
</Story>