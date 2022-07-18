<script lang="ts">
	import Fa from 'svelte-fa';
	import { goto } from '$app/navigation';
	import { faBookOpen, faList, faPlus } from '@fortawesome/free-solid-svg-icons/index';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import DeckTitle from '$lib/components/DeckTitle.svelte';
	import DeckCardStatus from '$lib/components/DeckCardStatus.svelte';

	if (window.electron) {
		window.electron.receive('ELECTRON-MODAL', () => {
			goto('/modal');
		});
	}
</script>

<main class="p-10 flex flex-col justify-center items-center gap-4">
	<DeckTitle />
	<DeckCardStatus />
	<div class="flex justify-center">
		<img class="object-cover h-64 tall:h-80" src="/KiokuLogo.png" alt="Kioku Logo" />
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
