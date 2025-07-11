<script lang="ts">
	//*** start of imports ***//
	import '@components/MagneticContainer/MagneticContainer.css';
	import { SHAPE, COMPONENT_EDGE_SIZE } from '@components/MagneticContainer/constance.svelte';
	import Rectangle from '@components/MagneticContainer/shapes/rectangle.svelte';
	import Circle from '@components/MagneticContainer/shapes/circle.svelte';
	import Diamond from '@components/MagneticContainer/shapes/diamond.svelte';
	import Triangle from '@components/MagneticContainer/shapes/triangle.svelte';
	import Pentagon from '@components/MagneticContainer/shapes/pentagon.svelte';
	import type { ComponentProps, Ref } from './types.d';
	import { onDestroy } from 'svelte';
	//*** end of imports ***//

	//*** start of props handing ***//
	let {
		shape = SHAPE.RECTANGLE,
		initialWidth = 150,
		initialHeight = 150,
		magnetic = true,
		id
	}: ComponentProps = $props();
	//*** end of props handing ***//

	//*** start of derived state ***//
	const shapeComponents = {
		[SHAPE.RECTANGLE]: Rectangle,
		[SHAPE.CIRCLE]: Circle,
		[SHAPE.DIAMOND]: Diamond,
		[SHAPE.TRIANGLE]: Triangle,
		[SHAPE.PENTAGON]: Pentagon
	};
	const Component = $derived(shapeComponents[shape]);
	//*** end of derived state ***//

	//*** start of reactive state ***//
	let position = $state({ x: 0, y: 0 });
	let size = $state({
		width: initialWidth,
		height: initialHeight
	});
	let dragging = $state(false);
	let resizing = $state(false);
	//*** end of reactive state ***//

	//*** start of non-reactive state ***//
	let containerRef: HTMLDivElement;
	let dragStart = { x: 0, y: 0 };
	let resizeStart = { x: 0, y: 0 };
	let initialSize = { width: 0, height: 0 };
	let initialPosition = { x: 0, y: 0 };
	// svelte-ignore non_reactive_update
	let magneticPointsContainerRef: Ref;
	//*** end of non-reactive state ***//

	//*** start of event handling ***//
	function handleMouseDown(event: MouseEvent) {
		const rect = containerRef.getBoundingClientRect();
		const edgeSize = COMPONENT_EDGE_SIZE;

		const onEdge =
			event.clientX > rect.left &&
			event.clientX < rect.right &&
			event.clientY > rect.top &&
			event.clientY < rect.bottom &&
			(event.clientX < rect.left + edgeSize ||
				event.clientX > rect.right - edgeSize ||
				event.clientY < rect.top + edgeSize ||
				event.clientY > rect.bottom - edgeSize);

		if (onEdge) {
			resizing = true;
			resizeStart = { x: event.clientX, y: event.clientY };
			initialSize = { ...size };
		} else {
			dragging = true;
			dragStart = { x: event.clientX, y: event.clientY };
			initialPosition = { ...position };
		}

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
	}

	function handleMouseMove(event: MouseEvent) {
		if (resizing) {
			const dx = event.clientX - resizeStart.x;
			const dy = event.clientY - resizeStart.y;

			if (Math.abs(dx) > Math.abs(dy)) {
				size.width = initialSize.width + dx;
				size.height = size.width * (initialSize.height / initialSize.width);
			} else {
				size.height = initialSize.height + dy;
				size.width = size.height * (initialSize.width / initialSize.height);
			}
		} else if (dragging) {
			const dx = event.clientX - dragStart.x;
			const dy = event.clientY - dragStart.y;
			position.x = initialPosition.x + dx;
			position.y = initialPosition.y + dy;
		}
	}

	function handleMouseUp() {
		dragging = false;
		resizing = false;
	}

	export function getPoints() {
		if (!magneticPointsContainerRef) {
			console.warn('Magnetic points container reference is not set.');
			return [];
		}
		if (typeof magneticPointsContainerRef.getPoints !== 'function') {
			console.warn('Magnetic points container does not have a getPoints method.');
			return [];
		}
		return magneticPointsContainerRef.getPoints();
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
	{id}
	bind:this={containerRef}
	class="{shape} container"
	class:magnetic
	style="
    width: {size.width}px;
    height: {size.height}px;
    left: {position.x}px;
    top: {position.y}px;
    cursor: {dragging ? 'grabbing' : resizing ? 'nwse-resize' : 'grab'};
  "
	onmousedown={handleMouseDown}
	role="cell"
	tabindex="0"
>
	{#if magnetic}
		<Component bind:this={magneticPointsContainerRef} />
	{/if}
</div>

<style src="@component/MagneticContainer/MagneticContainer.css"></style>
