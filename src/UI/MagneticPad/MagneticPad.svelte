<script lang="ts">
	//*** start of imports ***//
    import '@components/MagneticPad/MagneticPad.css';
	import type { ComponentProps } from '@components/MagneticPad/types.d.ts';
	//*** end of imports ***//

	//*** start of props handing ***//
	let { id }: ComponentProps = $props();
	//*** end of props handing ***//
</script>

<div class="magnetic-pad" {id}>
</div>

<style src="@components/MagneticPad/MagneticPad.css"></style>