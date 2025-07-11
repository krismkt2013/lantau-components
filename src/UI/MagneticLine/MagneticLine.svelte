<script lang="ts">
	//*** start of imports ***//
	import '@components/MagneticLine/MagneticLine.css';
	import type { MagneticLineProps } from './types.d';
	import { onDestroy } from 'svelte';
	//*** end of imports ***//

	//*** start of props handing ***//
	let {
		startPoint = { x: 0, y: 0 },
		endPoint = { x: 0, y: 0 },
		showStartArrow = false,
		showEndArrow = false,
		onPointsChange,
		id
	}: MagneticLineProps = $props();
	//*** end of props handing ***//

	//*** start of derived state ***//
	const length = $derived(
		Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2))
	);
	const angle = $derived(
		(Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x) * 180) / Math.PI
	);
	//*** end of derived state ***//

	//*** start of reactive state ***//
	let isDraggingStart = $state(false);
	let isDraggingEnd = $state(false);
	//*** end of reactive state ***//

	//*** start of event handling ***//
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
		if (onPointsChange) {
			onPointsChange(startPoint, endPoint);
		}
	}
	//*** end of event handling ***//

	//*** start of lifecycle management ***//
	onDestroy(() => {
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

<style src="@components/MagneticLine/MagneticLine.css"></style>
