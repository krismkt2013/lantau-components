<script lang="ts">
	import './MagneticLine.css';
	export let startPoint: { x: number; y: number };
	export let endPoint: { x: number; y: number };
	export let showStartArrow: boolean = false;
	export let showEndArrow: boolean = false;

	$: length = Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2));
	$: angle = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x) * 180 / Math.PI;
</script>

<div class="magnetic-line-container" style="left: {startPoint.x}px; top: {startPoint.y}px; width: {length}px; transform: rotate({angle}deg);">
	<div class="line"></div>
	{#if showStartArrow}
		<div class="arrow-start"></div>
	{/if}
	{#if showEndArrow}
		<div class="arrow-end"></div>
	{/if}
</div>