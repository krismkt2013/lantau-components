export enum SHAPE {
    RECTANGLE = 'rectangle',
    CIRCLE = 'circle',
    DIAMOND = 'diamond',
    TRIANGLE = 'triangle',
    PENTAGON = 'pentagon'
   }

import type { Point } from "@components/MagneticContainer/types";

export const NUM_POINTS = 24;

export const MAGNETIC_CONTAINER_CONTEXT_KEY = 'MCC';

export type MagneticContainerContext = {
    getMagneticPoints: () => Point[];
}