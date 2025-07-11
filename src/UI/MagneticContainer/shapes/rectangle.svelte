<script lang="ts">
	import {
		RECT_TOP_BOTTOM_POINTS,
		RECT_SIDE_POINTS
	} from '@components/MagneticContainer/constance.svelte';
</script>

<div class="magnetic-points">
	{#each RECT_TOP_BOTTOM_POINTS as p}
		<div class="point" style="top: 0; left: {p}%;"></div>
	{/each}
	{#each RECT_TOP_BOTTOM_POINTS as p}
		<div class="point" style="top: 100%; left: {p}%;"></div>
	{/each}
	{#each RECT_SIDE_POINTS as p}
		<div class="point" style="top: {p}%; left: 0;"></div>
	{/each}
	{#each RECT_SIDE_POINTS as p}
		<div class="point" style="top: {p}%; left: 100%;"></div>
	{/each}
</div>