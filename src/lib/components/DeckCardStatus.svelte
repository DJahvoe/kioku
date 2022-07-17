<script lang="ts">
	import DeckBadge from './DeckBadge.svelte';

	if (window.electron) {
		window.electron.send('SVELTE-GET');

		window.electron.receive('ELECTRON-GET', (payload: PayloadRespond) => {
			cards = payload.data;
		});
	}

	let cards: Card[] = [];
	$: newCardCount = cards.filter((card) => card.status === 'new').length;
	$: learningCardCount = cards.filter((card) => card.status === 'learning').length;
	$: dueCardCount = cards.filter((card) => card.status === 'due').length;
	$: seenCardCount = cards.filter((card) => card.status === 'seen').length;

	export let isSeenShown = false;
</script>

<div class="flex justify-center items-center gap-4">
	<DeckBadge title="New" color="red" content={newCardCount} />
	<DeckBadge title="Learning" color="yellow" content={learningCardCount} />
	<DeckBadge title="Due" color="green" content={dueCardCount} />
	{#if isSeenShown}
		<DeckBadge title="Seen" color="gray" content={seenCardCount} />
	{/if}
</div>
