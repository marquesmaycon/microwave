import {
	type ReactNode,
	useCallback,
	useEffect,
	useReducer,
	useRef,
} from "react";

import {
	initialState,
	MicrowaveContext,
	microwaveReducer,
	type Presets,
} from "./microwave-context";

import { formatTime } from "./utils";

export function MicrowaveProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(microwaveReducer, initialState);
	const intervalRef = useRef<number | null>(null);
	const beepAudioRef = useRef<HTMLAudioElement | null>(null);
	const tripleBeepAudioRef = useRef<HTMLAudioElement | null>(null);
	const ovenAudioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		beepAudioRef.current = new Audio("/beep.mp3");
		beepAudioRef.current.volume = 0.3;

		tripleBeepAudioRef.current = new Audio("/triple-beep.mp3");
		tripleBeepAudioRef.current.volume = 0.3;

		ovenAudioRef.current = new Audio("/oven.mp3");
		ovenAudioRef.current.volume = 0.1;
		ovenAudioRef.current.loop = true;
	}, []);

	const playBeep = useCallback((triple = false) => {
		const audio = triple ? tripleBeepAudioRef.current : beepAudioRef.current;
		if (audio) {
			audio.currentTime = 0;
			audio.play().catch(console.warn);
		}
	}, []);

	useEffect(() => {
		const ovenAudio = ovenAudioRef.current;
		if (!ovenAudio) return;

		if (state.status === "running") {
			ovenAudio.play().catch(console.warn);
		} else {
			ovenAudio.pause();
			ovenAudio.currentTime = 0;
		}
	}, [state.status]);

	useEffect(() => {
		if (state.status === "running" && state.time > 0) {
			intervalRef.current = window.setInterval(() => {
				dispatch({ type: "TICK" });
			}, 100);
			if (state.time === 100) playBeep(true);
		} else {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		}
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [state.status, state.time, playBeep]);

	const actions = {
		setTime: (time: number) => {
			playBeep();
			dispatch({ type: "SET_TIME", payload: time });
		},
		addTime: (time: number) => {
			playBeep();
			dispatch({ type: "ADD_TIME", payload: time });
		},
		startTimer: () => {
			playBeep();
			dispatch({ type: "START_TIMER" });
		},
		pauseTimer: () => {
			dispatch({ type: "PAUSE_TIMER" });
		},
		stopTimer: () => {
			dispatch({ type: "STOP_TIMER" });
		},
		selectProgram: (program: Presets) => {
			playBeep();
			dispatch({ type: "SELECT_PROGRAM", payload: program });
		},
		reset: () => {
			dispatch({ type: "RESET" });
		},
	};

	return (
		<MicrowaveContext.Provider value={{ state, actions, formatTime }}>
			{children}
		</MicrowaveContext.Provider>
	);
}
