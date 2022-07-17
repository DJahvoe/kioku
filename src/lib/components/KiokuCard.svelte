<script lang="ts">
	import DeckBadge from './DeckBadge.svelte';

	export let frontFace: string;
	export let backFace: string;
	export let status: 'new' | 'learning' | 'due' | 'seen' = 'seen';

	let badgeProps: {
		title: string | undefined;
		content: string;
		color: 'red' | 'green' | 'yellow' | 'gray';
	};
	switch (status) {
		case 'new':
			badgeProps = {
				title: undefined,
				content: 'NEW',
				color: 'red',
			};
			break;
		case 'learning':
			badgeProps = {
				title: undefined,
				content: 'LEARNING',
				color: 'yellow',
			};
			break;
		case 'due':
			badgeProps = {
				title: undefined,
				content: 'DUE',
				color: 'green',
			};
			break;
		case 'seen':
			badgeProps = {
				title: undefined,
				content: 'SEEN',
				color: 'gray',
			};
			break;
	}
</script>

<div class="flex items-end border-2 border-sky-500 p-5 w-full gap-2">
	<h1 class="text-5xl text-sky-500">{frontFace}</h1>
	<p class="text-3xl text-white">
		{backFace}
	</p>
	<div class="ml-auto">
		<DeckBadge {...badgeProps} />
	</div>
</div>
