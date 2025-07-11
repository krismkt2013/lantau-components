<script lang="ts">
	import { SHAPE } from '@components/MagneticContainer/constance.svelte';
	import Rectangle from '@components/MagneticContainer/shapes/rectangle.svelte'
	import Circle from '@components/MagneticContainer/shapes/circle.svelte';
	import Diamond from '@components/MagneticContainer/shapes/diamond.svelte';
	import '@components/MagneticContainer/MagneticContainer.css';

	export let shape: SHAPE = SHAPE.RECTANGLE;
	export let width: number = 150;
	export let height: number = 150;
	export let magnetic: boolean = true;


	const shapeComponents = {
		[SHAPE.RECTANGLE]: Rectangle,
		[SHAPE.CIRCLE]: Circle,
		[SHAPE.DIAMOND]: Diamond
	};

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
	class="{shape} container"
	class:magnetic
	style="width: {width}px; height: {height}px;"
	on:mousedown={handleMouseDown}
	role="cell"
	tabindex="0"
>
	<slot />
	{#if magnetic}
		<svelte:component this={shapeComponents[shape]} />
	{/if}
</div>
