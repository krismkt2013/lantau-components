import type { SHAPE } from './constance.svelte';
import type { Snippet } from 'svelte';

export interface Point {
	x: number;
	y: number;
}

export interface MagneticContainerProps {
	/**
	 * The shape of the container.
	 * @default SHAPE.RECTANGLE
	 */
	shape?: SHAPE;

	/**
	 * The initial width of the container in pixels.
	 * @default 150
	 */
	initialWidth?: number;

	/**
	 * The initial height of the container in pixels.
	 * @default 150
	 */
	initialHeight?: number;

	/**
	 * Determines if the container has magnetic points.
	 * @default true
	 */
	magnetic?: boolean;

	/**
	 * The ID of the container.
	 */
	id?: string;

	/**
	 * The content to be rendered inside the container.
	 */
	children?: Snippet;
}

export type MagneticContainerRef = { getPoints: () => HTMLDivElement[] };
