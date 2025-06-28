<script module lang="ts">
	import Class from '@components/Class/Class.svelte';
	import { defineMeta } from '@storybook/addon-svelte-csf';
		import { ProperType } from '@components/Class/constance.svelte';

	const { Story } = defineMeta({
		title: 'Class Diagram/Class',
		component: Class,
		tags: ['autodocs']
	});

	const args: ClassProps = {
		class: {
			name: 'Test Class',
			properties: [
				{ name: 'property1', type: ProperType.String, access: 'public' },
				{ name: 'property2', type: ProperType.Number, access: 'private', nullable: true },
				{ name: 'property3', type: ProperType.Boolean, access: 'protected' },
				{ name: 'property4', type: ProperType.Object},
				{ name: 'property5', type: ProperType.Array, access: 'private' }
			],
			methods: []
		}
	};

	const args2 = {
		...args,
	};
</script>

<Story 
	name="Primary"
	args={args}
/>

{#snippet renderProperty(property: ClassProperty)}
	<div>
		<div class="access">{property.access}</div>
		<div class="type">
			<p>{property.type}</p>
			<p>{':'}</p>
		</div>
		<div class="name">
			<p>{property.name}</p>
		</div>
	</div>
{/snippet}

<Story 
	name="Secondary"
	args={{
		...args2,
		renderProperty: renderProperty,
	}}
/>


