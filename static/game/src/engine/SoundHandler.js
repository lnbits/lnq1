import { GLOBAL_VOLUME } from '../constants/sounds.js';

const pendingSounds = new Map();
let audioUnlocked = false;
let muted = window.STREETFIGHTER_MUTED === true;

const rememberPendingSound = (sound, volume) => {
	if (!sound) return;
	pendingSounds.set(sound, volume);
};

const forgetPendingSound = (sound) => {
	pendingSounds.delete(sound);
};

export const playSound = (sound, volume = GLOBAL_VOLUME) => {
	if (!sound) return;
	if (muted) {
		sound.pause();
		return;
	}
	sound.volume = volume;
	const play = () => {
		const promise = sound.play();
		if (promise?.catch) {
			promise
				.then(() => forgetPendingSound(sound))
				.catch(() => rememberPendingSound(sound, volume));
		}
	};
	if (
		!sound.paused &&
		sound.currentTime > 0 &&
		!sound.ended &&
		sound.readyState > sound.HAVE_CURRENT_DATA
	) {
		sound.currentTime = 0;
		play();
	} else {
		play();
	}
};

export const stopSound = (sound) => {
	if (!sound) return;
	forgetPendingSound(sound);
	sound.pause();
	sound.currentTime = 0;
};

export const setMuted = (value) => {
	muted = value === true;
	window.STREETFIGHTER_MUTED = muted;
	document.querySelectorAll('audio').forEach((sound) => {
		sound.muted = muted;
		if (muted) sound.pause();
		if (!muted && sound.loop) playSound(sound, 0.2);
	});
};

export const isMuted = () => muted;

export const unlockAudio = () => {
	audioUnlocked = true;
	if (muted) return;
	for (const [sound, volume] of pendingSounds) {
		playSound(sound, volume);
	}
};

export const registerAudioUnlockEvents = () => {
	const unlock = () => {
		if (audioUnlocked) return;
		unlockAudio();
		window.removeEventListener('pointerdown', unlock);
		window.removeEventListener('touchstart', unlock);
		window.removeEventListener('keydown', unlock);
	};
	window.addEventListener('pointerdown', unlock, { once: true });
	window.addEventListener('touchstart', unlock, { once: true });
	window.addEventListener('keydown', unlock, { once: true });
};
