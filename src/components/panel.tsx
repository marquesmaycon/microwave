import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type TimerStatus = "idle" | "running" | "paused";

export const Panel = () => {
	const [time, setTime] = useState(0); // tempo em milissegundos
	const [running, setRunning] = useState<TimerStatus>("idle");
	const intervalRef = useRef<number | null>(null);

	// Atualiza o timer
	useEffect(() => {
		if (running === "running" && time > 0) {
			intervalRef.current = window.setInterval(() => {
				setTime((prev) => (prev > 0 ? prev - 0.1 : 0));
			}, 100);
		} else if (running === "idle" && intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
		if (time === 0 && intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
			setRunning("idle");
		}
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [running, time]);

	// Função para iniciar o timer (exemplo: 30 segundos)
	const startTimer = (ms: number = 3000) => {
		if (running === "running") {
			setTime((prev) => prev + ms);
		} else if (running === "paused") {
			setRunning("running");
		} else if (running === "idle") {
			setTime(ms);
			setRunning("running");
		}
	};

	const pauseTimer = () => {
		if (running === "running") {
			setRunning("paused");
		} else if (running === "paused") {
			setTime(0);
			setRunning("idle");
		}
	};

	// Formata o tempo para MM:SS
	const formatTime = (ms: number) => {
		const totalSeconds = Math.floor(ms / 1000);
		const minutes = Math.floor(totalSeconds / 60)
			.toString()
			.padStart(2, "0");
		const seconds = (totalSeconds % 60).toString().padStart(2, "0");
		return `${minutes}:${seconds}`;
	};

	return (
		<div className="border border-sky-600 bg-sky-600 flex-1 p-1 w-full h-full rounded-xl text-sm">
			<div className="flex items-start justify-center text-slate-50 bg-slate-800 rounded-xl text-4xl p-2">
				{formatTime(time)}
			</div>

			<div className="grid grid-cols-3 gap-2 mt-2 w-full">
				<PanelButton>Frango</PanelButton>
				<PanelButton>Pipoca</PanelButton>
				<PanelButton>Feijão</PanelButton>
				<PanelButton>Arroz</PanelButton>
				<PanelButton>Bebidas</PanelButton>
				<PanelButton>Batata</PanelButton>
			</div>

			<div className="grid grid-cols-3 gap-2 mt-2 w-full">
				{Array.from({ length: 9 }, (_, i) => (
					<PanelButton key={i.toString()}>{i + 1}</PanelButton>
				))}
				<PanelButton className="text-amber-500" onClick={pauseTimer}>
					Pausar /
					<br />
					Cancelar
				</PanelButton>
				<PanelButton>0</PanelButton>
				<PanelButton className="text-cyan-300" onClick={() => startTimer()}>
					Iniciar/
					<br />
					+30s
				</PanelButton>
			</div>
		</div>
	);
};

type PanelButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	children: React.ReactNode;
};

const PanelButton = ({ children, ...props }: PanelButtonProps) => {
	return (
		<button
			type="button"
			{...props}
			className={twMerge(
				"text-slate-50 text-center h-12 p-1 bg-cyan-900 rounded-xl hover:bg-cyan-700 active:bg-cyan-800 transition-colors border-1 border-cyan-600",
				props.className,
			)}
		>
			{children}
		</button>
	);
};
