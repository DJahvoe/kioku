<script>
	import { toast } from '$lib/stores';
	import { fly } from 'svelte/transition';
</script>

{#if $toast.isShowing}
	<div class="absolute top-3 right-6 py-3 px-5 bg-sky-500 rounded-md" transition:fly={{ y: 10 }}>
		✓ <span>{$toast.message}</span>
	</div>
{/if}
