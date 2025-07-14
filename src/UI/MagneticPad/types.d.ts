import type {
	MagneticContainerProps,
	MagneticContainerRef
} from '@components/MagneticContainer/types.d';
import type { MagneticLineProps } from '@components/MagneticLine/types.d';
import type { Snippet } from 'svelte';

export type MagneticPadProps = {
	id?: string;
	children?: Snippet;
};

export type MagneticPadRef = {
	addMagneticContainer: (props?: Omit<MagneticContainerProps, 'id' | 'children'>) => string;
	addMagneticLine: (props?: Omit<MagneticLineProps, 'id'>) => string;
};

export type ClosestContainer = {
	id: string;
	container: MagneticContainerRef;
	rect: DOMRect;
};
