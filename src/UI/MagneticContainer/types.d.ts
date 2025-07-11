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
}
