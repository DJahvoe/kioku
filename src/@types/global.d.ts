/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />
declare interface Window {
	electron: any;
}

declare module '@fortawesome/pro-solid-svg-icons/index.es' {
	export * from '@fortawesome/pro-solid-svg-icons';
}

declare module 'svelte-fa/src/fa.svelte' {
	export * from 'svelte-fa/src/fa.svelte';
}
