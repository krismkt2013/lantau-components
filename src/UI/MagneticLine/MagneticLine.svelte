<script lang="ts">
	import '@components/MagneticLine/MagneticLine.css';
	import type { Point } from '@components/MagneticContainer/types';
	import { allMagneticPoints } from '@components/MagneticContainer/magneticPointsStore.svelte';
	import { MIN_DISTANCE_TO_MAGNETIC_POINT } from '@components/MagneticLine/constance.svelte';

	export let startPoint: Point;
	export let endPoint: Point;
	export let showStartArrow: boolean = false;
	export let showEndArrow: boolean = false;

	$: length = Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2));
	$: angle = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x) * 180 / Math.PI;

	let isDraggingStart = false;
	let isDraggingEnd = false;

	// find the closest magnetic point to a given point (start / end)
	function findClosestPoint(point: Point): Point | null {
		let closestPoint: Point | null = null;
		let minDistance = Infinity;

		for (const p of $allMagneticPoints) {
			const distance = Math.sqrt(Math.pow(p.x - point.x, 2) + Math.pow(p.y - point.y, 2));
			if (distance < minDistance) {
				minDistance = distance;
				closestPoint = p;
			}
		}

		if (closestPoint && minDistance < MIN_DISTANCE_TO_MAGNETIC_POINT) {
			return closestPoint;
		}

		return null;
	}

	// When mousedown start to listen to mousemove and mouseup events
	function handleMouseDown(event: MouseEvent, handle: 'start' | 'end') {
		if (handle === 'start') {
			isDraggingStart = true;
		} else {
			isDraggingEnd = true;
		}
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
	}

	// Based on the mouse position, update the start or end point
	// If there is a magnetic point close enough, snap to it
	function handleMouseMove(event: MouseEvent) {
		let newPoint = { x: event.clientX, y: event.clientY };
		const closestPoint = findClosestPoint(newPoint);

		if (closestPoint) {
			newPoint = closestPoint;
		}

		if (isDraggingStart) {
			startPoint = newPoint;
		} else if (isDraggingEnd) {
			endPoint = newPoint;
		}
	}

	// When mouseup, check if the point is close to a magnetic point again
	// If it is, snap to that point
	// Remove the event listeners for mousemove and mouseup
	function handleMouseUp() {
		if (isDraggingStart) {
			const closestPoint = findClosestPoint(startPoint);
			if (closestPoint) {
				startPoint = closestPoint;
			}
		}
		if (isDraggingEnd) {
			const closestPoint = findClosestPoint(endPoint);
			if (closestPoint) {
				endPoint = closestPoint;
			}
		}
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