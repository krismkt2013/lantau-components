<script lang="ts">
	import { Shape } from './constance.svelte';

	export let shape: Shape = Shape.Rectangle;
	export let width: number = 150;
	export let height: number = 150;

	let dragging = false;
	let initialX: number;
	let initialY: number;
	let initialWidth: number;
	let initialHeight: number;

	function handleMouseDown(event: MouseEvent) {
		dragging = true;
		initialX = event.clientX;
		initialY = event.clientY;
		initialWidth = width;
		initialHeight = height;
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
	}

	function handleMouseMove(event: MouseEvent) {
		if (!dragging) return;
		const dx = event.clientX - initialX;
		const dy = event.clientY - initialY;

		if (Math.abs(dx) > Math.abs(dy)) {
			width = initialWidth + dx;
			height = width * (initialHeight / initialWidth);
		} else {
			height = initialHeight + dy;
			width = height * (initialWidth / initialHeight);
		}
	}

	function handleMouseUp() {
		dragging = false;
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', handleMouseUp);
	}
</script>

<div
	class="{shape}"
	style="width: {width}px; height: {height}px;"
	on:mousedown={handleMouseDown}
	role="button"
	tabindex="0"
>
	<slot />
</div>

<style>
	div {
		border: 1px solid #ccc;
		padding: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: move;
	}
	.rectangle {
		border-radius: 10px;
	}
	.circle {
		border-radius: 50%;
	}
</style>
