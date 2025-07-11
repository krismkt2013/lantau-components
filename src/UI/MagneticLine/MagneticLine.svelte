<script lang="ts">
	import './MagneticLine.css';
 	import { writable } from 'svelte/store';
    import type { Point } from '@components/MagneticLine/types';

	export let startPoint: Point;
	export let endPoint: { x: number; y: number };
	export let showStartArrow: boolean = false;
	export let showEndArrow: boolean = false;

	export const magneticPoints = writable<Point[]>([]);

	$: length = Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2));
	$: angle = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x) * 180 / Math.PI;

	let isDraggingStart = false;
	let isDraggingEnd = false;

	function handleMouseDown(event: MouseEvent, handle: 'start' | 'end') {
		if (handle === 'start') {
			isDraggingStart = true;
		} else {
			isDraggingEnd = true;
		}
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
	}

	function handleMouseMove(event: MouseEvent) {
		let newPoint = { x: event.clientX, y: event.clientY };

		let closestPoint: Point | null = null;
		let minDistance = Infinity;

		for (const point of $magneticPoints) {
			const distance = Math.sqrt(Math.pow(point.x - newPoint.x, 2) + Math.pow(point.y - newPoint.y, 2));
			if (distance < minDistance) {
				minDistance = distance;
				closestPoint = point;
			}
		}

		if (closestPoint && minDistance < 20) {
			newPoint = closestPoint;
		}

		if (isDraggingStart) {
			startPoint = newPoint;
		} else if (isDraggingEnd) {
			endPoint = newPoint;
		}
	}

	function handleMouseUp() {
		isDraggingStart = false;
		isDraggingEnd = false;
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', handleMouseUp);
	}
</script>

<div class="magnetic-line-container" style="left: {startPoint.x}px; top: {startPoint.y}px; width: {length}px; transform: rotate({angle}deg);">
	<div class="line"></div>
	<div 
		class="handle-start" 
		on:mousedown|stopPropagation={(e) => handleMouseDown(e, 'start')}
		role="button"
		tabindex="0"
	></div>
	<div 
		class="handle-end" 
		on:mousedown|stopPropagation={(e) => handleMouseDown(e, 'end')}
		role="button"
		tabindex="0"
	></div>
	{#if showStartArrow}
		<div class="arrow-start"></div>
	{/if}
	{#if showEndArrow}
		<div class="arrow-end"></div>
	{/if}
</div>