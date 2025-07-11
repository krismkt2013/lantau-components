<script lang="ts">
	import '@components/MagneticLine/MagneticLine.css';
	import { onDestroy } from 'svelte';
	import type { MagneticLineProps } from '@components/MagneticLine/types';

	//***  start of props handing ***//
	/**
	 * @type MagneticLineProps
	 * @property {x: number, y: number} startPoint - The starting point of the line.
	 * @property {x: number, y: number} endPoint - The ending point of the line.
	 * @property {boolean} showStartArrow - Whether to show an arrow at the start of the line.
	 * @property {boolean} showEndArrow - Whether to show an arrow at the end of the line.
	 */
	let {
		startPoint = { x: 0, y: 0 },
		endPoint = { x: 0, y: 0 },
		showStartArrow = false,
		showEndArrow = false,
		onPointsChange,
		id,
	}: MagneticLineProps = $props();
	//***  end of props handing ***//


	//***  start of derived state handling ***
	let length = $derived.by(() =>
		Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2))
	);
	let angle = $derived.by(
		() => (Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x) * 180) / Math.PI
	);
	//***  end of derived state handling ***/

	//*** start of non-reactive state management ***
	let isDraggingStart = false;
	let isDraggingEnd = false;
	//*** end of non-reactive state management ***


	//*** start of internal event handling ***/
	// When mousedown start to listen to mousemove and mouseup events
	// also set the dragging target to either start or end of the line
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

		if (isDraggingStart) {
			startPoint = newPoint;
		} else if (isDraggingEnd) {
			endPoint = newPoint;
		}
	}

	// When mouse up, check if the point is close to a magnetic point again
	// If it is, snap to that point
	// Remove the event listeners for mousemove and mouseup
	function handleMouseUp() {
		isDraggingStart = false;
		isDraggingEnd = false;
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', handleMouseUp);
		if (onPointsChange) {
			onPointsChange(startPoint, endPoint);
		}
	}
	//*** end of internal event handling ***/

	//*** start of lifecycle management ***
	onDestroy(() => {
		// Clean up event listeners when the component is destroyed
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', handleMouseUp);
	});
	//*** end of lifecycle management ***/
</script>

<div
	id={id}
	class="magnetic-line-container"
	style="left: {startPoint.x}px; top: {startPoint.y}px; width: {length}px; transform: rotate({angle}deg);"
>
	<div class="line"></div>
	<div
		class="handle-start"
		onmousedown={(e) => {
			e.preventDefault();
			handleMouseDown(e, 'start');
		}}
		role="button"
		tabindex="0"
	></div>
	<div
		class="handle-end"
		onmousedown={(e) => {
			e.preventDefault();
			handleMouseDown(e, 'end');
		}}
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
