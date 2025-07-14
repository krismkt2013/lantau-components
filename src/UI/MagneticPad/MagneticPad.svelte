<script lang="ts">
	//*** start of imports ***//
	import '@components/MagneticPad/MagneticPad.css';
	import type {
		ClosestContainer,
		MagneticPadProps,
	} from '@components/MagneticPad/types.d.ts';
	import MagneticContainer from '@components/MagneticContainer/MagneticContainer.svelte';
	import type { MagneticContainerProps, MagneticContainerRef } from '@components/MagneticContainer/types';
	import MagneticLine from '@components/MagneticLine/MagneticLine.svelte';
	import type { MagneticLineProps, Point } from '@components/MagneticLine/types';
	//*** end of imports ***//

	//*** start of props handing ***//
	let { id, children }: MagneticPadProps = $props();
	//*** end of props handing ***//

	//*** start of state ***//
	let containers = $state<MagneticContainerProps[]>([]);
	let lines = $state<MagneticLineProps[]>([]);
	let containerRefs: Record<string, MagneticContainerRef> = $state({});
	//*** end of state ***//

	//*** start of exports ***//
	export function addMagneticContainer(
		props?: Omit<MagneticContainerProps, 'id' | 'children'>
	): string {
		const newId = crypto.randomUUID();
		containers.push({ ...props, id: newId });
		return newId;
	}

	export function addMagneticLine(props?: Omit<MagneticLineProps, 'id'>): string {
		const newId = crypto.randomUUID();
		lines.push({ ...props, id: newId });
		return newId;
	}
	//*** end of exports ***//

	//*** start of event handling ***//
	function onPointsChange(startPoint: Point, endPoint: Point, change: 'start' | 'end', id: string) {
		const changePoint = change === 'start' ? startPoint : endPoint;

		// Find the closest container
		let closestContainer: ClosestContainer | null = null;
		let minDistance = Infinity;

		for (const containerId in containerRefs) {
			const container = containerRefs[containerId];
			if (container) {
				const rect = container.getPoints()[0]?.parentElement?.getBoundingClientRect();
				if (!rect) continue;
				const distance = Math.sqrt(
					Math.pow(changePoint.x - (rect.left + rect.width / 2), 2) +
						Math.pow(changePoint.y - (rect.top + rect.height / 2), 2)
				);

				if (distance < minDistance) {
					minDistance = distance;
					closestContainer = { id: containerId, container, rect };
				}
			}
		}

		if (closestContainer) {
			const magneticPoints = closestContainer.container.getPoints();
			let closestPoint: HTMLDivElement | null = null;
			let minMagneticDistance = Infinity;

			for (const point of magneticPoints) {
				const rect = point.getBoundingClientRect();
				const magneticPoint = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
				const distance = Math.sqrt(
					Math.pow(changePoint.x - magneticPoint.x, 2) + Math.pow(changePoint.y - magneticPoint.y, 2)
				);

				if (distance < minMagneticDistance) {
					minMagneticDistance = distance;
					closestPoint = point;
				}
			}

			if (minMagneticDistance <= 10) {
				const lineIndex = lines.findIndex((line) => line.id === id);
				if (lineIndex !== -1) {
					const updatedLines = [...lines];
					const lineToUpdate = { ...updatedLines[lineIndex] };
					const pointId = closestPoint?.getAttribute('id') || '';
					if (change === 'start') {
						lineToUpdate.from = `${closestContainer.id}:${pointId}`;
					} else {
						lineToUpdate.to = `${closestContainer.id}:${pointId}`;
					}
					updatedLines[lineIndex] = lineToUpdate;
					lines = updatedLines;
				}
			}
		}
	}
	//*** end of event handling ***//
</script>

<div class="magnetic-pad" {id}>
	{#each containers as container (container.id)}
		<MagneticContainer {...container} bind:this={containerRefs[container.id!]} />
	{/each}
	{#each lines as line (line.id)}
		<MagneticLine
			{...line}
			onPointsChange={(start, end, change) => onPointsChange(start, end, change, line.id!)}
		/>
	{/each}
	{@render children?.()}
</div>

<style src="@components/MagneticPad/MagneticPad.css"></style>
