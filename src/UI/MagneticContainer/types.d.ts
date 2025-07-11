import type { SHAPE } from './constance.svelte';

export interface Point {
	x: number;
	y: number;
}

export interface ComponentProps {
	/**
	 * The shape of the container.
	 * @default SHAPE.RECTANGLE
	 */
	shape?: SHAPE;

	/**
	 * The initial width of the container in pixels.
	 * @default 150
	 */
	width?: number;

	/**
	 * The initial height of the container in pixels.
	 * @default 150
	 */
	height?: number;

	/**
	 * Determines if the container has magnetic points.
	 * @default true
	 */
	magnetic?: boolean;
}
