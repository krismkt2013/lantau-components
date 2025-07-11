<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import type { Point } from '@components/MagneticContainer/types';

  const containerPositions = writable<Record<string, Point>>({});
  setContext('container-positions', containerPositions);

  export const addContainer = (id: string, position: Point) => {
    containerPositions.update(positions => {
      positions[id] = position;
      return positions;
    });
  };

  export const updateContainerPosition = (id: string, position: Point) => {
    containerPositions.update(positions => {
      positions[id] = position;
      return positions;
    });
  };
</script>

<div class="magnetic-pad">
  <slot />
</div>