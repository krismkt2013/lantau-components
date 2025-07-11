<script lang="ts">
	//*** start of imports ***//
	import { NUM_POINTS } from '@components/MagneticContainer/constance.svelte';
	//*** end of imports ***//

	//*** start of derived state ***//
	const points = $derived.by(() => {
		const corners = [
			{ x: 50, y: 0 },
			{ x: 100, y: 100 },
			{ x: 0, y: 100 }
		];
		const newPoints: { x: number; y: number; id: string }[] = [];
		const pointsPerSide = Math.floor(NUM_POINTS / 3);
		const remainder = NUM_POINTS % 3;

		for (let i = 0; i < 3; i++) {
			const startPoint = corners[i];
			const endPoint = corners[(i + 1) % 3];
			const numSidePoints = pointsPerSide + (i < remainder ? 1 : 0);
			for (let j = 0; j < numSidePoints; j++) {
				const t = j / numSidePoints;
				const x = startPoint.x + t * (endPoint.x - startPoint.x);
				const y = startPoint.y + t * (endPoint.y - startPoint.y);
				newPoints.push({ x, y, id: `t-point-${i}-${j}` });
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
