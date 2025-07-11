<script lang="ts">
	//*** start of imports ***//
	import { NUM_POINTS } from '@components/MagneticContainer/constance.svelte';
	//*** end of imports ***//

	//*** start of derived state ***//
	const points = $derived.by(() => {
		const corners = [
			{ x: 0, y: 0 },
			{ x: 100, y: 0 },
			{ x: 100, y: 100 },
			{ x: 0, y: 100 }
		];
		const newPoints: { x: number; y: number; id: number }[] = [];
		const pointsPerSide = NUM_POINTS / 4;

		for (let i = 0; i < 4; i++) {
			const startPoint = corners[i];
			const endPoint = corners[(i + 1) % 4];
			for (let j = 0; j < pointsPerSide; j++) {
				const t = j / pointsPerSide;
				const x = startPoint.x + t * (endPoint.x - startPoint.x);
				const y = startPoint.y + t * (endPoint.y - startPoint.y);
				newPoints.push({ x, y, id: i });
			}
		}
		return newPoints;
	});
	//*** end of derived state ***//
</script>

<div class="magnetic-points">
	{#each points as point (point.id)}
		<div class="point" style="top: {point.y}%; left: {point.x}%;"></div>
	{/each}
</div>
