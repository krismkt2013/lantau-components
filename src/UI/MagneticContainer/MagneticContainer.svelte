<script lang="ts">
	import { SHAPE, COMPONENT_EDGE_SIZE } from '@components/MagneticContainer/constance.svelte';
	import Rectangle from '@components/MagneticContainer/shapes/rectangle.svelte';
	import Circle from '@components/MagneticContainer/shapes/circle.svelte';
	import Diamond from '@components/MagneticContainer/shapes/diamond.svelte';
	import Triangle from '@components/MagneticContainer/shapes/triangle.svelte';
	import Pentagon from '@components/MagneticContainer/shapes/pentagon.svelte';
	import '@components/MagneticContainer/MagneticContainer.css';

	export let shape: SHAPE = SHAPE.RECTANGLE;
	export let width: number = 150;
	export let height: number = 150;
	export let magnetic: boolean = true;

	const shapeComponents = {
		[SHAPE.RECTANGLE]: Rectangle,
		[SHAPE.CIRCLE]: Circle,
		[SHAPE.DIAMOND]: Diamond,
		[SHAPE.TRIANGLE]: Triangle,
		[SHAPE.PENTAGON]: Pentagon
	};

	let containerRef: HTMLDivElement;

	let position = { x: 0, y: 0 };
	let size = { width, height };
	let dragging = false;
	let resizing = false;
	let dragStart = { x: 0, y: 0 };
	let resizeStart = { x: 0, y: 0 };
	let initialSize = { width: 0, height: 0 };
	let initialPosition = { x: 0, y: 0 };

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
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', handleMouseUp);
	}
</script>

<div
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
	on:mousedown={handleMouseDown}
	role="cell"
	tabindex="0"
>
	<slot />
	{#if magnetic}
		<svelte:component this={shapeComponents[shape]} />
	{/if}
</div>
