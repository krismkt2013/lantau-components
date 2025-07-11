<script lang="ts">
	import { NUM_POINTS } from '@components/MagneticContainer/constance.svelte';

	let circlePoints: { x: number; y: number }[] = [];
	$: {
		circlePoints = [];
		for (let i = 0; i < NUM_POINTS; i++) {
			const angle = (i / NUM_POINTS) * 2 * Math.PI;
			const x = 50 + 50 * Math.cos(angle);
			const y = 50 + 50 * Math.sin(angle);
			circlePoints.push({ x, y });
		}
	}
</script>

<div class="magnetic-points">
	{#each circlePoints as point}
		<div class="point" style="top: {point.y}%; left: {point.x}%;"></div>
	{/each}
</div>