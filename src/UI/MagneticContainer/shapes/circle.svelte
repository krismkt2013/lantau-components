<script lang="ts">
	//*** start of imports ***//
	import { NUM_POINTS } from '@components/MagneticContainer/constance.svelte';
	//*** end of imports ***//

	//*** start of state ***//
	let pointsRef: HTMLDivElement[] = $state([]);
	//*** end of state ***//

	//*** start of derived state ***//
	const circlePoints = $derived.by(() => {
		const points: { x: number; y: number; id: string }[] = [];
		for (let i = 0; i < NUM_POINTS; i++) {
			const angle = (i / NUM_POINTS) * 2 * Math.PI;
			const x = 50 + 50 * Math.cos(angle);
			const y = 50 + 50 * Math.sin(angle);
			points.push({ x, y, id: `p${i}` });
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
	{#each circlePoints as point, i (point.id)}
		<div 
			class="point" 
			style="top: {point.y}%; left: {point.x}%;" 
			bind:this={pointsRef[i]} 
			id={point.id}
			data-point-id={point.id}
		></div>
	{/each}
</div>
