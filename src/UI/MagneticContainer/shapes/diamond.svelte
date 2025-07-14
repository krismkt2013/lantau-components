<script lang="ts">
	//*** start of imports ***//
	import { NUM_POINTS } from '@components/MagneticContainer/constance.svelte';
	//*** end of imports ***//

	//*** start of state ***//
	let pointsRef: HTMLDivElement[] = $state([]);
	//*** end of state ***//

	//*** start of derived state ***//
	const diamondPoints = $derived.by(() => {
		const corners = [
			{ x: 50, y: 0 },
			{ x: 100, y: 50 },
			{ x: 50, y: 100 },
			{ x: 0, y: 50 }
		];
		const points: { x: number; y: number; id: string }[] = [];
		const pointsPerSide = NUM_POINTS / 4;

		let count = 0;
		for (let i = 0; i < 4; i++) {
			const startPoint = corners[i];
			const endPoint = corners[(i + 1) % 4];
			for (let j = 0; j < pointsPerSide; j++) {
				const t = j / pointsPerSide;
				const x = startPoint.x + t * (endPoint.x - startPoint.x);
				const y = startPoint.y + t * (endPoint.y - startPoint.y);
				points.push({ x, y, id: `p${count}` });
				count++;
			}
		}
		return points;
	});
	//*** end of derived state ***//

	//*** start of exports ***//
	export function getPoints() {
		return pointsRef;
	}
	//*** end of exports ***//
</script>

<div class="magnetic-points">
	{#each diamondPoints as point, i (point.id)}
		<div
			class="point"
			style="top: {point.y}%; left: {point.x}%; z-index: 1;"
			id={point.id}
			bind:this={pointsRef[i]}
			data-point-id={point.id}
		></div>
	{/each}
</div>
