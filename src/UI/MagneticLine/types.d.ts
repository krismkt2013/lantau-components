export interface Point {
	x: number;
	y: number;
}

export interface MagneticLineProps {
	/**
	 * The starting point of the line.
	 * @default { x: 0, y: 0 }
	 */
	startPoint?: Point;
	/**
	 * The ending point of the line.
	 * @default { x: 0, y: 0 }
	 */
	endPoint?: Point;
	/**
	 * Whether to show an arrow at the start of the line.
	 * @default false
	 */
	showStartArrow?: boolean;
	/**
	 * Whether to show an arrow at the end of the line.
	 * @default false
	 */
	showEndArrow?: boolean;
	/**
	 * Callback function that is called when the points of the line change.
	 */
	onPointsChange?: (startPoint: Point, endPoint: Point) => void;
	/**
	 * The id of the line.
	 */
	id?: string;
}