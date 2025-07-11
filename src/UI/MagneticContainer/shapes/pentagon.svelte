<script lang="ts">
	//*** start of imports ***//
	import { NUM_POINTS } from '@components/MagneticContainer/constance.svelte';
	//*** end of imports ***//

	//*** start of derived state ***//
	const points = $derived.by(() => {
		const corners = [
			{ x: 50, y: 0 },
			{ x: 100, y: 38 },
			{ x: 82, y: 100 },
			{ x: 18, y: 100 },
			{ x: 0, y: 38 }
		];
		const newPoints: { x: number; y: number; id: string }[] = [];
		const pointsPerSide = Math.floor(NUM_POINTS / 5);
		const remainder = NUM_POINTS % 5;

		for (let i = 0; i < 5; i++) {
			const startPoint = corners[i];
			const endPoint = corners[(i + 1) % 5];
			const numSidePoints = pointsPerSide + (i < remainder ? 1 : 0);
			for (let j = 0; j < numSidePoints; j++) {
				const t = j / numSidePoints;
				const x = startPoint.x + t * (endPoint.x - startPoint.x);
				const y = startPoint.y + t * (endPoint.y - startPoint.y);
				newPoints.push({ x, y, id: `p-point-${i}-${j}` });
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
