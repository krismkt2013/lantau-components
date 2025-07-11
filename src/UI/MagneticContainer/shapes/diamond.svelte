<script lang="ts">
	//*** start of imports ***//
	import { NUM_POINTS } from '@components/MagneticContainer/constance.svelte';
	//*** end of imports ***//

	//*** start of derived state ***//
	const diamondPoints = $derived.by(() => {
		const corners = [
			{ x: 50, y: 0 },
			{ x: 100, y: 50 },
			{ x: 50, y: 100 },
			{ x: 0, y: 50 }
		];
		const points: { x: number; y: number; id: number }[] = [];
		const pointsPerSide = NUM_POINTS / 4;

		for (let i = 0; i < 4; i++) {
			const startPoint = corners[i];
			const endPoint = corners[(i + 1) % 4];
			for (let j = 0; j < pointsPerSide; j++) {
				const t = j / pointsPerSide;
				const x = startPoint.x + t * (endPoint.x - startPoint.x);
				const y = startPoint.y + t * (endPoint.y - startPoint.y);
				points.push({ x, y, id: i });
			}
		}
		return points;
	});
	//*** end of derived state ***//
</script>

<div class="magnetic-points">
	{#each diamondPoints as point (point.id)}
		<div class="point" style="top: {point.y}%; left: {point.x}%; z-index: 1;"></div>
	{/each}
</div>
