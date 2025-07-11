<script lang="ts">
	//*** start of imports ***//
	import { NUM_POINTS } from '@components/MagneticContainer/constance.svelte';
	//*** end of imports ***//

	//*** start of derived state ***//
	const circlePoints = $derived.by(() => {
		const points: { x: number; y: number }[] = [];
		for (let i = 0; i < NUM_POINTS; i++) {
			const angle = (i / NUM_POINTS) * 2 * Math.PI;
			const x = 50 + 50 * Math.cos(angle);
			const y = 50 + 50 * Math.sin(angle);
			points.push({ x, y });
		}
		return points;
	});
	//*** end of derived state ***//
</script>

<div class="magnetic-points">
	{#each circlePoints as point}
		<div class="point" style="top: {point.y}%; left: {point.x}%;"></div>
	{/each}
</div>
