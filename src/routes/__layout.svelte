<script lang="ts">
	import '../global.css';
	import { onMount } from 'svelte';
	import { toast } from '$lib/stores';
	import Toast from '$lib/components/Toast.svelte';

	let ready: boolean = false;
	onMount(() => (ready = true));
</script>

{#if $toast.isShowing}
	<Toast />
{/if}

{#if ready}
	<slot />
{/if}
