import { type ReactNode, useMemo, useReducer } from "react";

import {
	initialState,
	MicrowaveContext,
	microwaveReducer,
	type Presets,
} from "./microwave-context";
import { useMicrowaveSounds } from "./useMicrowaveSounds";
import { useMicrowaveTimer } from "./useMicrowaveTimer";

export function MicrowaveProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(microwaveReducer, initialState);
	const { playBeep } = useMicrowaveSounds(state.status === "running");

	useMicrowaveTimer({
		status: state.status,
		time: state.time,
		tick: () => dispatch({ type: "TICK" }),
		playBeep,
	});

	const actions = useMemo(
		() => ({
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
			tick: () => {
				dispatch({ type: "TICK" });
			},
			playBeep,
		}),
		[playBeep],
	);

	return (
		<MicrowaveContext.Provider value={{ state, actions }}>
			{children}
		</MicrowaveContext.Provider>
	);
}
