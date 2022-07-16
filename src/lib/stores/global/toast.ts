import { derived, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

type Toast = {
	isShowing: boolean;
	message: string;
	timeout: number;
};

const TIMEOUT = 2000;
export function createToastStore() {
	const _toast = writable<Toast>({
		isShowing: false,
		message: '',
		timeout: TIMEOUT,
	});

	const toast = derived<Writable<Toast>, Toast>(_toast, ($_toast, set) => {
		set($_toast);
		if ($_toast.isShowing) {
			const timer = setTimeout(() => {
				set({ ...$_toast, isShowing: false });
			}, $_toast.timeout);

			return () => clearTimeout(timer);
		}
	});

	const { subscribe } = toast;

	function send(message: string, timeout = TIMEOUT) {
		_toast.set({ isShowing: true, message, timeout });
	}

	return {
		subscribe,
		send,
	};
}
