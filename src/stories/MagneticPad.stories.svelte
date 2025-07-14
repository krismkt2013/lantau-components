<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MagneticPad from '@components/MagneticPad/MagneticPad.svelte';
	import { SHAPE } from '@components/MagneticContainer/constance.svelte';
	import type { MagneticPadRef } from '@components/MagneticPad/types.d.ts';

	const { Story } = defineMeta({
		title: 'Component/MagneticPad',
		component: MagneticPad,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	let magneticPadRef: MagneticPadRef | null = null;

	function addContainer () {
		if (magneticPadRef) {
			magneticPadRef.addMagneticContainer({
				shape: SHAPE.RECTANGLE,
				initialWidth: 150,
				initialHeight: 150,
			});
		}
	}

	function addLine () {
		if (magneticPadRef) {
			magneticPadRef.addMagneticLine({
				initialStartPoint: { x: 50, y: 50 },
				initialEndPoint: { x: 200, y: 200 },
				showStartArrow: true,
				showEndArrow: true,
			});
		}
	}
</script>

<Story name="Dynamic Add">
	<div style="height: 500px; width: 500px;">
		
		<div style="padding: 5rem; justify-content: center; align-items: center;">
			<button onclick={addContainer}>Add Elements</button>
			<p>Click the button to add a rectangle and a circle with a line connecting them.</p>

			<button onclick={addLine}>Add Line</button>
			<p>Click the button to add a line between two points.</p>
		</div>
		
		<MagneticPad bind:this={magneticPadRef} id="dynamic-magnetic-pad">
		</MagneticPad>
	</div>
</Story>
