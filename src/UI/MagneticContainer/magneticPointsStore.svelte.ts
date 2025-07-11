import { writable } from 'svelte/store';
import type { Point } from '@components/MagneticContainer/types';

export const allMagneticPoints = writable<Point[]>([]);