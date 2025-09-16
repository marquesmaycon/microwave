import { useCallback, useEffect, useRef } from "react";

export function useMicrowaveSounds(playOvenSound: boolean) {
	const beepRef = useRef<HTMLAudioElement | null>(null);
	const tripleBeepRef = useRef<HTMLAudioElement | null>(null);
	const ovenRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		beepRef.current = new Audio("/beep.mp3");
		beepRef.current.volume = 0.3;

		tripleBeepRef.current = new Audio("/triple-beep.mp3");
		tripleBeepRef.current.volume = 0.3;

		ovenRef.current = new Audio("/oven.mp3");
		ovenRef.current.volume = 0.1;
		ovenRef.current.loop = true;
	}, []);

	useEffect(() => {
		const ovenAudio = ovenRef.current;
		if (!ovenAudio) return;

		if (playOvenSound) {
			ovenAudio.play().catch(console.warn);
		} else {
			ovenAudio.pause();
			ovenAudio.currentTime = 0;
		}
	}, [playOvenSound]);

	const playBeep = useCallback((triple = false) => {
		const audio = triple ? tripleBeepRef.current : beepRef.current;
		if (audio) {
			audio.currentTime = 0;
			audio.play().catch(console.warn);
		}
	}, []);

	return { playBeep };
}
