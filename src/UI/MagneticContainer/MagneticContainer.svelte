<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { SHAPE } from '@components/MagneticContainer/constance.svelte';
	import Rectangle from '@components/MagneticContainer/shapes/rectangle.svelte'
	import Circle from '@components/MagneticContainer/shapes/circle.svelte';
	import Diamond from '@components/MagneticContainer/shapes/diamond.svelte';
	import Triangle from '@components/MagneticContainer/shapes/triangle.svelte';
	import Pentagon from '@components/MagneticContainer/shapes/pentagon.svelte';
	import '@components/MagneticContainer/MagneticContainer.css';
	import type { Point } from '@components/MagneticContainer/types';
	import { allMagneticPoints } from './magneticPointsStore.svelte';

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

	let dragging = false;
	let initialX: number;
	let initialY: number;
	let initialWidth: number;
	let initialHeight: number;
	let containerRef: HTMLDivElement;
	let magneticPoints: Point[] = [];

	// When the mouse down listen to mousemove and mouseup events
	function handleMouseDown(event: MouseEvent) {
		dragging = true;
		initialX = event.clientX;
		initialY = event.clientY;
		initialWidth = width;
		initialHeight = height;
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
	}

	// update the width and height based on mouse movement
	// Update the magnetic points based on the new size
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
		updateMagneticPoints();
	}

	function handleMouseUp() {
		dragging = false;
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', handleMouseUp);
	}

	function updateMagneticPoints() {
		if (!containerRef) return;
		const rect = containerRef.getBoundingClientRect();
		const magneticPointsElements = containerRef.querySelectorAll('.magnetic-points .point');
		const newPoints: Point[] = [];
		magneticPointsElements.forEach(element => {
			const pointElement = element as HTMLDivElement;
			const x = rect.left + (parseFloat(pointElement.style.left) / 100) * rect.width;
			const y = rect.top + (parseFloat(pointElement.style.top) / 100) * rect.height;
			newPoints.push({ x, y });
		});

		allMagneticPoints.update(points => {
			const otherPoints = points.filter(p => !magneticPoints.includes(p));
			return [...otherPoints, ...newPoints];
		});
		magneticPoints = newPoints;
	}

	onMount(() => {
		updateMagneticPoints();
	});

	onDestroy(() => {
		allMagneticPoints.update(points => points.filter(p => !magneticPoints.includes(p)));
	});
</script>

<div
	bind:this={containerRef}
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
