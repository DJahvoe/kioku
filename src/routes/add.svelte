<script lang="ts">
	import EscButton from '$lib/components/EscButton.svelte';
	import DeckTitle from '$lib/components/DeckTitle.svelte';
	import { toast } from '$lib/stores';

	function submitHandler(e: SubmitEvent) {
		e.preventDefault();

		if (window.electron) {
			window.electron.send('SVELTE-ADD', {
				data: {
					frontFace,
					backFace,
				},
			});

			window.electron.receive('ELECTRON-ADD', (payload: PayloadRespond) => {
				toast.send(payload.message);
			});
		}
		reset();
	}

	function reset() {
		frontFace = '';
		backFace = '';
	}

	let frontFace: string;
	let backFace: string;
</script>

<div class="absolute top-4 left-4">
	<EscButton />
</div>
<main class="p-10 flex flex-col justify-center items-center gap-4">
	<DeckTitle />
	<div class="bg-white opacity-25 w-screen h-1" />
	<form
		class="flex flex-col items-center w-full mt-5 gap-4"
		on:submit|preventDefault={submitHandler}
	>
		<div class="flex flex-col w-1/2 gap-1">
			<label class="text-sky-500 font-bold uppercase" for="frontface">Front Face</label>
			<input
				class="bg-transparent border-gray-400 focus:outline-sky-500 text-white border-2 rounded-md p-3"
				bind:value={frontFace}
				type="text"
			/>
		</div>
		<div class="flex flex-col w-1/2 gap-1">
			<label class="text-sky-500 font-bold uppercase" for="backface">Back Face</label>
			<input
				class="bg-transparent border-gray-400 focus:outline-sky-500 text-white border-2 rounded-md p-3"
				bind:value={backFace}
				type="text"
			/>
		</div>
		<div class="flex w-1/2 gap-4 mt-5">
			<button
				class="flex-1 text-xl font-bold bg-transparent hover:bg-green-500 border-green-500 text-green-500 hover:text-white border-2 rounded-md p-2"
				type="submit"
			>
				SUBMIT
			</button>
			<button
				class="flex-1 text-xl font-bold bg-transparent hover:bg-gray-500 border-gray-500 text-gray-500 hover:text-white border-2 rounded-md p-2"
				type="button"
				on:click={reset}
			>
				RESET
			</button>
		</div>
	</form>
</main>
