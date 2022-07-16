<script lang="ts">
	import ArrowButton from '$lib/components/ArrowButton.svelte';
	import DeckSideTitle from '$lib/components/DeckSideTitle.svelte';
	import EscButton from '$lib/components/EscButton.svelte';
	import KiokuCard from '$lib/components/KiokuCard.svelte';
	import ToggleTextButton from '$lib/components/ToggleTextButton.svelte';
	import { onMount } from 'svelte';

	function arrowUpHandler() {
		isFlipped = !isFlipped;
		isAnswered = true;
	}

	function resetFlip() {
		isFlipped = false;
		isAnswered = false;
	}

	function getStudyCards() {
		if (window.electron) {
			window.electron.send('SVELTE-GET', {
				data: {
					studyMode: true,
				},
			});

			window.electron.receive('ELECTRON-GET', (payload: PayloadRespond) => {
				cards = payload.data;
			});
		}
	}

	function studyCard(quality: number) {
		if (window.electron) {
			window.electron.send('SVELTE-STUDY', {
				data: {
					id: currentCard.id,
					quality,
				},
			});
		}
		resetFlip();
		getStudyCards();
	}

	let isFlipped = false;
	let isAnswered = false;
	let cards: Card[] = [];

	let currentCard: Card;
	$: if (cards.length > 0) {
		currentCard = cards[0];
	}
	$: isStudyNotFinished = cards.length > 0;
	getStudyCards();
</script>

<DeckSideTitle />
<div class="flex justify-center items-center absolute top-4 left-4 gap-2">
	<EscButton />
	<ToggleTextButton />
</div>

{#if isStudyNotFinished}
	<div id="arrow-button-collection">
		<ArrowButton text="Toggle Answer" color="gray" direction="up" handler={arrowUpHandler} />
		{#if isAnswered}
			<ArrowButton
				text="I don't know"
				color="red"
				direction="left"
				handler={() => studyCard(0)}
			/>
			<ArrowButton
				text="I can recall it"
				color="yellow"
				direction="right"
				handler={() => studyCard(3)}
			/>
			<ArrowButton
				text="This is easy"
				color="green"
				direction="down"
				handler={() => studyCard(5)}
			/>
		{/if}
	</div>
{/if}

<div id="remaining-counter" class="absolute bottom-4 right-4 text-8xl text-gray-600">
	<p>{cards.length}</p>
</div>

<main>
	{#if isStudyNotFinished}
		<KiokuCard frontFace={currentCard.frontFace} backFace={currentCard.backFace} {isFlipped} />
	{:else}
		<div
			class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center text-white text-4xl"
		>
			You finished your study for today! <br />
			Please go back to main menu
		</div>
	{/if}
</main>
