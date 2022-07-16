import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

type Settings = {
	isShowText: boolean;
};

export function createSettingStore() {
	const { subscribe, update } = writable<Settings>({
		isShowText: true,
	});

	return {
		subscribe,
		toggleShowText: () =>
			update((settings) => ({ ...settings, isShowText: !settings.isShowText })),
	};
}
