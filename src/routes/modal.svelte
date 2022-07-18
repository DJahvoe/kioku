<script lang="ts">
	import { onMount } from 'svelte';

	function submitHandler() {
		if (window.electron) {
			window.electron.send('SVELTE-ADD', {
				data: {
					frontFace,
					backFace,
				},
			});
		}
		reset();
		cancelHandler();
	}

	function reset() {
		frontFace = '';
		backFace = '';
	}

	function cancelHandler() {
		window.electron.send('SVELTE-CLOSEMODAL');
	}

	function keydownHandler(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			cancelHandler();
		} else if (event.key === 'Enter') {
			submitHandler();
		}
	}

	onMount(() => {
		firstInput.focus();
	});

	let frontFace: string;
	let backFace: string;
	let firstInput: HTMLInputElement;
</script>

<svelte:window on:keydown={keydownHandler} />

<form
	class="flex flex-col justify-center items-center gap-4 w-screen h-screen border-2 border-sky-500 p-4"
	on:submit|preventDefault
>
	<div class="flex flex-col w-10/12 gap-1">
		<label class="text-sky-500 font-bold uppercase" for="frontface">Front Face</label>
		<input
			class="bg-transparent border-gray-400 focus:outline-sky-500 text-white border-2 rounded-md p-3"
			bind:value={frontFace}
			type="text"
			bind:this={firstInput}
		/>
	</div>
	<div class="flex flex-col w-10/12 gap-1">
		<label class="text-sky-500 font-bold uppercase" for="backface">Back Face</label>
		<input
			class="bg-transparent border-gray-400 focus:outline-sky-500 text-white border-2 rounded-md p-3"
			bind:value={backFace}
			type="text"
		/>
	</div>
</form>
