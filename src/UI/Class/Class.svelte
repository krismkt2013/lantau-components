<script lang="ts">
	import '@rootStyles';
	import { ProperType } from '@components/Class/constance.svelte';
	const props: ClassProps = $props();

	const getAccessSign = (access?: string): string => {
		switch (access) {
			case 'public':
				return '+';
			case 'private':
				return '-';
			case 'protected':
				return '#';
			default:
				return '';
		}
	};

	const getTypeSign = (type: ProperType): string => {
		switch (type) {
			case ProperType.String:
				return 'Str';
			case ProperType.Number:
				return 'Num';
			case ProperType.Boolean:
				return 'Bool';
			case ProperType.Array:
				return 'Arr';
			case ProperType.Object:
				return 'Obj';
			default:
				return 'Unknown';
		}
	};
</script>

<div class="card">
	<div class="card-header fw-bold">
		{props.class.name}
	</div>
	<div class="card-body">
		<ul class="list-group list-group-flush">
			{#each props.class.properties as property: ClassProperty}
				<li class="list-group-item">
					<div class="access">{getAccessSign(property.access)}</div>
					<div class="type">
						<p>{getTypeSign(property.type)}</p>
						<p>{':'}</p>
					</div>
					<div class="name">
						<p>{property.name}</p>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.card-body {
		padding: 0;
	}

	.list-group-item {
		display: flex;
		align-items: center;
		justify-content: start;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		padding-left: 0;
		padding-right: 0;
		min-height: 2.7rem;
		padding: 1rem 1rem;

		&:nth-of-type(even) {
			background-color: var(--even-row-bg);
		}
		&:nth-of-type(odd) {
			background-color: var(--odd-row-bg);
		}

		.access {
			width: 1rem;
			font-size: 1rem;
			margin-bottom: 0;
			margin-right: 0.4rem;
		}
		.type {
			display: flex;
			width: 2.6rem;
			font-size: 1rem;
			margin-bottom: 0;
			margin-right: 1rem;
			align-items: center;
			justify-content: space-between;
			> p {
				margin-bottom: 0;
			}
		}
		.name {
			flex-grow: 1;
			font-size: 1rem;
			> p {
				margin-bottom: 0;
			}
		}
	}
</style>
