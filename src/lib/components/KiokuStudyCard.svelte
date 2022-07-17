<script lang="ts">
	export let frontFace: string;
	export let backFace: string;
	export let isFlipped: boolean;
</script>

<div
	class="flex flex-col justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-2"
>
	<p class="text-8xl text-sky-500 font-bold">
		{frontFace}
	</p>
	{#if isFlipped}
		<p class="text-5xl text-white">
			{backFace}
		</p>
	{/if}
</div>
