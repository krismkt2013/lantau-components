<script lang="ts">
	import { NUM_POINTS } from '@components/MagneticContainer/constance.svelte';

	let points: { x: number; y: number }[] = [];
	$: {
		const corners = [
			{ x: 50, y: 0 },
			{ x: 100, y: 100 },
			{ x: 0, y: 100 }
		];
		const newPoints: { x: number; y: number }[] = [];
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
				newPoints.push({ x, y });
			}
		}
		points = newPoints;
	}
</script>

<div class="magnetic-points">
	{#each points as p}
		<div class="point" style="top: {p.y}%; left: {p.x}%;"></div>
	{/each}
</div>