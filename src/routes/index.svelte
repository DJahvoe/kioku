<script lang="ts">
	import { browser } from '$app/env';

	import Fa from 'svelte-fa';
	import { faBookOpen, faList, faPlus } from '@fortawesome/free-solid-svg-icons/index';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import DeckBadge from '$lib/components/DeckBadge.svelte';
	import DeckTitle from '$lib/components/DeckTitle.svelte';

	let desktop: string;
	// console.log(window.electron);

	if (window.electron && browser) {
		window.electron.receive('from-main', (data: any) => {
			desktop = `Received Message "${data}" from Electron`;
			console.log(desktop);
		});
	}
</script>

<main class="p-10 flex flex-col justify-center items-center gap-4">
	<DeckTitle />
	<div class="flex justify-center items-center gap-4 mb-4">
		<DeckBadge title="New" color="red" count={12} />
		<DeckBadge title="Learning" color="yellow" count={12} />
		<DeckBadge title="Due" color="green" count={12} />
	</div>
	<div class="flex justify-center">
		<img class="object-cover h-48 tall:h-80" src="/KiokuLogo.png" alt="Kioku Logo" />
	</div>
	<div class="flex justify-center gap-8 my-9">
		<Tooltip text="Study">
			<a href="/study" class="icon-button">
				<Fa icon={faBookOpen} />
			</a>
		</Tooltip>
		<Tooltip text="List">
			<a href="/list" class="icon-button">
				<Fa icon={faList} />
			</a>
		</Tooltip>
		<Tooltip text="Add Card">
			<a href="/add" class="icon-button">
				<Fa icon={faPlus} />
			</a>
		</Tooltip>
	</div>
</main>

<style>
	.icon-button {
		@apply flex justify-center w-20 border-2 border-sky-500 rounded-md text-4xl bg-transparent text-sky-500  p-4 transition-all duration-100 ease-in cursor-pointer;
	}
	.icon-button:hover {
		@apply bg-sky-500 text-white;
	}
</style>
