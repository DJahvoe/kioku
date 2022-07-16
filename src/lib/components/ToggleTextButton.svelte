<script lang="ts">
	import { settings } from '$lib/stores';

	function toggleTextHandler(e: KeyboardEvent) {
        if (e.key === 'F2') {
				settings.toggleShowText();
			}
	}

    function clickToggleTextHandler(e: MouseEvent) {
        settings.toggleShowText();
    }
</script>

<svelte:window on:keydown={toggleTextHandler} />

<div class=" flex gap-2 items-center">
	<button
		on:click={clickToggleTextHandler}
		class="border-2 bg-transparent hover:bg-sky-500 border-sky-500 rounded-md text-sky-500 hover:text-white font-bold py-1 px-3 text-lg"
	>
		F2
	</button>
	{#if $settings.isShowText}
		<p class="text-white text-sm w-20 leading-4">Toggle Text</p>
	{/if}
</div>
