<script module>
	import Class from '@components/Class/Class.svelte';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Class Diagram/Class',
		component: Class,
		tags: ['autodocs']
	});
</script>

<Story name="Primary" />
