export interface Point {
	x: number;
	y: number;
}

export interface MagneticLineProps {
	/**
	 * The unique identifier for the magnetic line component.
	 * This ID is applied to the root `div` element.
	 * @default undefined
	 */
	id?: string;

	/**
	 * The starting point of the line, defined by x and y coordinates.
	 * The component will render the line starting from this position.
	 * @default { x: 0, y: 0 }
	 */
	startPoint?: Point;

	/**
	 * The ending point of the line, defined by x and y coordinates.
	 * The component will render the line ending at this position.
	 * @default { x: 0, y: 0 }
	 */
	endPoint?: Point;

	/**
	 * Determines whether to display an arrow at the starting point of the line.
	 * When `true`, an arrow pointing outwards from the start will be visible.
	 * @default false
	 */
	showStartArrow?: boolean;

	/**
	 * Determines whether to display an arrow at the ending point of the line.
	 * When `true`, an arrow pointing outwards from the end will be visible.
	 * @default false
	 */
	showEndArrow?: boolean;

	/**
	 * A callback function that is invoked whenever the start or end points of the line are changed
	 * by user interaction (i.e., dragging the handles). The function receives the new `startPoint`
	 * and `endPoint` as arguments.
	 * @default undefined
	 */
	onPointsChange?: (startPoint: Point, endPoint: Point) => void;
}
