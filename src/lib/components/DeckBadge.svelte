<script lang="ts">
	export let title: string;
	export let count: number;
	export let color: 'red' | 'green' | 'yellow';
</script>

<div class={`flex flex-col justify-center items-center ${color}`}>
	<p class="uppercase text-xs mb-1">{title}</p>
	<span class="border-2 py-1 px-2 rounded-lg text-center">{count}</span>
</div>

<style>
	div p {
		@apply opacity-75;
	}

	div span {
		min-width: 50px;
	}

	.red p {
		@apply text-red-500;
	}
	.red span {
		@apply text-red-500 border-red-500;
	}

	.yellow p {
		@apply text-yellow-500;
	}
	.yellow span {
		@apply text-yellow-500 border-yellow-500;
	}

	.green p {
		@apply text-green-500;
	}
	.green span {
		@apply text-green-500 border-green-500;
	}
</style>
