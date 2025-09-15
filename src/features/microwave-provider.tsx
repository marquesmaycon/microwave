import { type ReactNode, useEffect, useReducer, useRef } from "react";

import {
	initialState,
	MicrowaveContext,
	microwaveReducer,
	type Presets,
} from "./microwave-context";

export function MicrowaveProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(microwaveReducer, initialState);
	const intervalRef = useRef<number | null>(null);

	// Efeito para controlar o timer
	useEffect(() => {
		if (state.status === "running" && state.time > 0) {
			intervalRef.current = window.setInterval(() => {
				dispatch({ type: "TICK" });
			}, 100);
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
	}, [state.status, state.time]);

	const actions = {
		setTime: (time: number) => dispatch({ type: "SET_TIME", payload: time }),
		addTime: (time: number) => dispatch({ type: "ADD_TIME", payload: time }),
		startTimer: () => dispatch({ type: "START_TIMER" }),
		pauseTimer: () => dispatch({ type: "PAUSE_TIMER" }),
		stopTimer: () => dispatch({ type: "STOP_TIMER" }),
		setPower: (power: number) =>
			dispatch({ type: "SET_POWER", payload: power }),
		selectProgram: (program: Presets) =>
			dispatch({ type: "SELECT_PROGRAM", payload: program }),
		reset: () => dispatch({ type: "RESET" }),
	};

	const formatTime = (ms: number) => {
		const totalSeconds = Math.floor(ms / 1000);
		const minutes = Math.floor(totalSeconds / 60)
			.toString()
			.padStart(2, "0");
		const seconds = (totalSeconds % 60).toString().padStart(2, "0");
		return `${minutes}:${seconds}`;
	};

	return (
		<MicrowaveContext.Provider value={{ state, actions, formatTime }}>
			{children}
		</MicrowaveContext.Provider>
	);
}
