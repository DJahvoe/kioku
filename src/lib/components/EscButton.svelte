<script lang="ts">
	import { goto } from '$app/navigation';

	function backToMainMenuHandler(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			goto('/');
		}
	}
</script>

<svelte:window on:keydown={backToMainMenuHandler} />

<div class="absolute top-4 left-4 flex gap-2 items-center">
	<a
		href="/"
		class="border-2 bg-transparent hover:bg-sky-500 border-sky-500 rounded-md text-sky-500 hover:text-white font-bold py-1 px-3 text-lg"
	>
		Esc
	</a>
	<p class="text-white text-sm w-20 leading-4">Back to Main Menu</p>
</div>
