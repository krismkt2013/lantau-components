export type MagneticLineProps = {
	startPoint: {
        x: number;
        y: number;
    };
	endPoint: {
        x: number;
        y: number;
    };
	showStartArrow: boolean;
	showEndArrow: boolean;
    onPointsChange?: (startPoint: { x: number; y: number }, endPoint: { x: number; y: number }) => void;
};