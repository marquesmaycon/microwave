import { useEffect, useRef } from "react";

import type { TimerStatus } from "./microwave-context";

type UseMicrowaveTimerProps = {
	status: TimerStatus;
	time: number;
	tick: () => void;
	playBeep: (triple?: boolean) => void;
};

export function useMicrowaveTimer({
	status,
	time,
	tick,
	playBeep,
}: UseMicrowaveTimerProps) {
	const intervalRef = useRef<number | null>(null);

	useEffect(() => {
		if (status === "running" && time > 0) {
			intervalRef.current = window.setInterval(tick, 100);
			if (time === 100) playBeep(true);
		} else {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		}
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [status, time, tick, playBeep]);
}
