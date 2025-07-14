<script lang="ts">
	//*** start of imports ***//
	import '@components/MagneticLine/MagneticLine.css';
	import type { MagneticLineProps } from './types.d';
	import { onDestroy, onMount } from 'svelte';
	import { POSITION_CHANGE_EVENT_KEY } from '@components/MagneticContainer/constance.svelte';
	//*** end of imports ***//

	//*** start of props handing ***//
	let {
		initialStartPoint = { x: 0, y: 0 },
		initialEndPoint = { x: 0, y: 0 },
		showStartArrow = false,
		showEndArrow = false,
		onPointsChange,
		id,
		from,
		to
	}: MagneticLineProps = $props();
	//*** end of props handing ***//

	//*** start of reactive state ***//
	let startPoint = $state({ x: 0, y: 0 });
	let endPoint = $state({ x: 0, y: 0 });
	let isDraggingStart = $state(false);
	let isDraggingEnd = $state(false);
	let lineRef: HTMLDivElement | null = null;
	//*** end of state ***//

	//*** start of non-reactive state ***//
	let startContainerId: string | null = null;
	let startPointId: string | null = null;
	let endContainerId: string | null = null;
	let endPointId: string | null = null;
	let startElement: HTMLElement | null = null;
	let endElement: HTMLElement | null = null;
	let startContainerElement: HTMLElement | null = null;
	let endContainerElement: HTMLElement | null = null;

	//*** start of derived state ***//
	const length = $derived(
		Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2))
	);
	const angle = $derived(
		(Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x) * 180) / Math.PI
	);
	//*** end of derived state ***//

	//*** start of event handling ***//
	$effect(() => {
		if (from) {
			const ids = from.split(':');
			if (ids.length === 2) {
				startContainerId = ids[0];
				startPointId = ids[1];
			}
		} else {
			startContainerId = null;
			startPointId = null;
		}
		if (to) {
			const ids = to.split(':');
			if (ids.length === 2) {
				endContainerId = ids[0];
				endPointId = ids[1];
			}
		} else {
			endContainerId = null;
			endPointId = null;
		}

		if (startContainerElement) {
			startContainerElement.removeEventListener(POSITION_CHANGE_EVENT_KEY, updatePoints);
			startContainerElement = null;
			startElement = null;
		}
		if (endContainerElement) {
			endContainerElement.removeEventListener(POSITION_CHANGE_EVENT_KEY, updatePoints);
			endContainerElement = null;
			endElement = null;
		}

		if (startContainerId) {
			startContainerElement = document.getElementById(startContainerId);
			if (startContainerElement) {
				startElement = startContainerElement.querySelector(`[data-point-id='${startPointId}']`);
				startContainerElement.addEventListener(POSITION_CHANGE_EVENT_KEY, updatePoints);
			}
		}

		if (endContainerId) {
			endContainerElement = document.getElementById(endContainerId);
			if (endContainerElement) {
				endElement = endContainerElement.querySelector(`[data-point-id='${endPointId}']`);
				endContainerElement.addEventListener(POSITION_CHANGE_EVENT_KEY, updatePoints);
			}
		}

		updatePoints();
	});

	function updatePoints() {
		const parentRect = lineRef?.parentElement?.getBoundingClientRect();
		if (!parentRect) return;

		if (startElement) {
			const startRect = startElement.getBoundingClientRect();
			startPoint = {
				x: startRect.left - parentRect.left + startRect.width / 2,
				y: startRect.top - parentRect.top + startRect.height / 2
			};
		}

		if (endElement) {
			const endRect = endElement.getBoundingClientRect();
			endPoint = {
				x: endRect.left - parentRect.left + endRect.width / 2,
				y: endRect.top - parentRect.top + endRect.height / 2
			};
		}
	}

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
		const parentRect = lineRef?.parentElement?.getBoundingClientRect();
		if (!parentRect) return;

		const newPoint = {
			x: event.clientX - parentRect.left,
			y: event.clientY - parentRect.top
		};

		if (isDraggingStart) {
			startPoint = newPoint;
		} else if (isDraggingEnd) {
			endPoint = newPoint;
		}
	}

	function handleMouseUp() {
		if (onPointsChange) {
			const parentRect = lineRef?.parentElement?.getBoundingClientRect();
			if (!parentRect) return;

			const absoluteStartPoint = {
				x: startPoint.x + parentRect.left,
				y: startPoint.y + parentRect.top
			};
			const absoluteEndPoint = {
				x: endPoint.x + parentRect.left,
				y: endPoint.y + parentRect.top
			};

			onPointsChange(absoluteStartPoint, absoluteEndPoint, isDraggingStart ? 'start' : 'end');
		}
		isDraggingStart = false;
		isDraggingEnd = false;
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', handleMouseUp);
	}
	//*** end of event handling ***//

	//*** start of lifecycle management ***//
	onDestroy(() => {
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', handleMouseUp);

		if (startContainerElement) {
			startContainerElement.removeEventListener(POSITION_CHANGE_EVENT_KEY, updatePoints);
		}
		if (endContainerElement) {
			endContainerElement.removeEventListener(POSITION_CHANGE_EVENT_KEY, updatePoints);
		}
	});

	onMount(() => {
		startPoint = initialStartPoint;
		endPoint = initialEndPoint;
	});
	//*** end of lifecycle management ***/
</script>

<div
	{id}
	bind:this={lineRef}
	class="magnetic-line-container"
	style="left: {startPoint.x}px; top: {startPoint.y}px; width: {length}px; transform: rotate({angle}deg); z-index: 1;"
>
	<div class="line"></div>
	{#if showStartArrow}
		<div class="arrow-start"></div>
	{/if}
	{#if showEndArrow}
		<div class="arrow-end"></div>
	{/if}
</div>
<div
	class="handle-start"
	style="left: {startPoint.x}px; top: {startPoint.y}px;"
	onmousedown={(e) => {
		e.preventDefault();
		handleMouseDown(e, 'start');
	}}
	role="button"
	tabindex="0"
></div>
<div
	class="handle-end"
	style="left: {endPoint.x}px; top: {endPoint.y}px;"
	onmousedown={(e) => {
		e.preventDefault();
		handleMouseDown(e, 'end');
	}}
	role="button"
	tabindex="0"
></div>

<style src="@components/MagneticLine/MagneticLine.css"></style>
