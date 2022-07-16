<script lang="ts">
	import Fa from 'svelte-fa';
	import {
		faCircleDown,
		faCircleLeft,
		faCircleRight,
		faCircleUp,
		type IconDefinition,
	} from '@fortawesome/free-solid-svg-icons/index';
	import { settings } from '$lib/stores';
	import { fade } from 'svelte/transition';

	export let handler: () => void;
	export let text: string;
	export let direction: 'up' | 'down' | 'left' | 'right';
	export let color: 'red' | 'green' | 'yellow' | 'gray';

	function directionArrowHandler(e: KeyboardEvent) {
		const isPressedAsDeclared =
			(e.key === 'ArrowUp' && direction === 'up') ||
			(e.key === 'ArrowDown' && direction === 'down') ||
			(e.key === 'ArrowLeft' && direction === 'left') ||
			(e.key === 'ArrowRight' && direction === 'right');
		if (isPressedAsDeclared) {
			handler();
		}
	}

	let icon: IconDefinition;
	switch (direction) {
		case 'up':
			icon = faCircleUp;
			break;
		case 'down':
			icon = faCircleDown;
			break;
		case 'left':
			icon = faCircleLeft;
			break;
		case 'right':
			icon = faCircleRight;
			break;
	}
</script>

<svelte:window on:keydown={directionArrowHandler} />

<div class={`flex justify-center items-center absolute text-${color}-500 ${direction}`}>
	<Fa class="text-3xl" {icon} />
	{#if $settings.isShowText}
		<p class="opacity-75 m-1">{text}</p>
	{/if}
</div>

<style>
	div.up {
		@apply flex-col-reverse top-2 left-1/2 -translate-x-1/2;
	}

	div.down {
		@apply flex-col bottom-2 left-1/2 -translate-x-1/2;
	}

	div.left {
		@apply flex-row top-1/2 left-2 -translate-y-1/2;
	}

	div.right {
		@apply flex-row-reverse top-1/2 right-2 -translate-y-1/2;
	}
</style>
