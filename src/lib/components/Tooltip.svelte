<script>
	let hovering;

	function enter() {
		hovering = true;
	}

	function leave() {
		hovering = false;
	}

	export let text;
</script>

<div class="relative" on:mouseenter={enter} on:mouseleave={leave}>
	{#if hovering}
		<p
			class="absolute flex justify-center items-center py-1 w-full -top-10 text-white bg-sky-500 rounded-md"
		>
			{text}
		</p>
	{/if}
	<slot />
</div>
