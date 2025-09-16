import { createContext, useContext } from "react";

export type TimerStatus = "idle" | "running" | "paused";

export const presetPrograms = {
	Aquecer: {
		ms: 120000,
		img: "🥙",
	},
	Bebidas: {
		ms: 120000,
		img: "☕",
	},
	Pipoca: {
		ms: 180000,
		img: "🍿",
	},
	Milho: {
		ms: 60000,
		img: "🌽",
	},
	Arroz: {
		ms: 900000,
		img: "🍚",
	},
	Batata: {
		ms: 480000,
		img: "🍟",
	},
};

export type Presets = keyof typeof presetPrograms;

type MicrowaveState = {
	time: number;
	status: TimerStatus;
	selectedProgram: Presets | null;
};

type MicrowaveAction =
	| { type: "SET_TIME"; payload: number }
	| { type: "ADD_TIME"; payload: number }
	| { type: "START_TIMER" }
	| { type: "PAUSE_TIMER" }
	| { type: "STOP_TIMER" }
	| { type: "TICK" }
	| { type: "SET_POWER"; payload: number }
	| { type: "SELECT_PROGRAM"; payload: Presets }
	| { type: "RESET" };

export const initialState: MicrowaveState = {
	time: 0,
	status: "idle",
	selectedProgram: null,
};

export function microwaveReducer(
	state: MicrowaveState,
	action: MicrowaveAction,
): MicrowaveState {
	switch (action.type) {
		case "SET_TIME":
			return { ...state, time: action.payload };

		case "ADD_TIME":
			return { ...state, time: state.time + action.payload };

		case "START_TIMER":
			if (state.time > 0) {
				return { ...state, status: "running" };
			}
			return state;

		case "PAUSE_TIMER":
			return {
				...state,
				status: state.status === "running" ? "paused" : state.status,
			};

		case "STOP_TIMER":
			return { ...state, status: "idle", time: 0, selectedProgram: null };

		case "TICK": {
			const newTime = Math.max(0, state.time - 100);
			return {
				...state,
				time: newTime,
				status: newTime === 0 ? "idle" : state.status,
			};
		}
		case "SELECT_PROGRAM": {
			if (state.status === "running") {
				return { ...state, status: "paused" };
			}
			return { ...state, selectedProgram: action.payload, status: "idle" };
		}

		case "RESET":
			return initialState;

		default:
			return state;
	}
}

type MicrowaveContextType = {
	state: MicrowaveState;
	actions: {
		setTime: (time: number) => void;
		addTime: (time: number) => void;
		startTimer: () => void;
		pauseTimer: () => void;
		stopTimer: () => void;
		selectProgram: (program: Presets) => void;
		reset: () => void;
	};
	formatTime: (ms: number) => string;
};

export const MicrowaveContext = createContext<MicrowaveContextType | undefined>(
	undefined,
);

export function useMicrowave() {
	const context = useContext(MicrowaveContext);
	if (context === undefined) {
		throw new Error("useMicrowave must be used within a MicrowaveProvider");
	}
	return context;
}
