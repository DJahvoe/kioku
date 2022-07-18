<script lang="ts">
	import DeckTitle from '$lib/components/DeckTitle.svelte';
	import EscButton from '$lib/components/EscButton.svelte';
	import KiokuCard from '$lib/components/KiokuCard.svelte';
	import DeckCardStatus from '$lib/components/DeckCardStatus.svelte';

	if (window.electron) {
		window.electron.send('SVELTE-GET');

		window.electron.receive('ELECTRON-GET', (payload: PayloadRespond) => {
			cards = payload.data;
		});

		window.electron.receive('ELECTRON-ADD', (payload: PayloadRespond) => {
			window.electron.send('SVELTE-GET');
		});
	}

	let cards: Card[] = [];
	let searchString = '';
	$: filteredCard = cards.filter(
		(card) => card.frontFace.includes(searchString) || card.backFace.includes(searchString),
	);
</script>

<div class="flex justify-center items-center absolute top-4 left-4 gap-2">
	<EscButton />
</div>
<div class="flex flex-col  gap-6">
	<DeckTitle />
	<DeckCardStatus isSeenShown={true} />
	<hr class="border-gray-500" />
	<div class="flex justify-center">
		<input
			type="text"
			placeholder="Search..."
			bind:value={searchString}
			class="border-2 border-white focus:outline-sky-500 bg-transparent text-white text-xl w-1/2 p-3"
		/>
	</div>
	<div class="w-full flex justify-center">
		<div
			id="card-collection"
			class="flex flex-col items-center w-3/4 overflow-y-auto gap-4 p-3"
		>
			{#each filteredCard as card (card.id)}
				<KiokuCard
					frontFace={card.frontFace}
					backFace={card.backFace}
					status={card.status}
				/>
			{/each}
		</div>
	</div>
</div>

<style>
	#card-collection {
		height: 60vh;
	}
</style>
