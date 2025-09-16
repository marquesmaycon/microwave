import { twMerge } from "tailwind-merge";

import {
	type Presets,
	presetPrograms,
	useMicrowave,
} from "../microwave/microwave-context";
import { formatTime } from "../microwave/utils";

export const Panel = () => {
	const { state, actions } = useMicrowave();
	const { status, time, selectedProgram } = state;

	const handleNumberInput = (digit: number) => {
		if (selectedProgram) return;

		// Converte tempo atual para segundos
		const currentSeconds = Math.floor(time / 1000);

		// Transforma em string sem zeros à esquerda (máx 4 dígitos)
		const digits = currentSeconds.toString();

		// Se já tem 4 dígitos, não aceita mais entrada
		if (digits.length >= 4) return;

		// Adiciona novo dígito
		const newDigits = digits + digit.toString();

		// Garante 4 dígitos (MMSS)
		const timeString = newDigits.padStart(4, "0");

		let minutes = parseInt(timeString.slice(0, 2), 10);
		let seconds = parseInt(timeString.slice(2, 4), 10);

		// Ajusta segundos > 59
		if (seconds > 59) {
			minutes += Math.floor(seconds / 60);
			seconds = seconds % 60;
		}

		const newTimeInMs = (minutes * 60 + seconds) * 1000;
		actions.setTime(newTimeInMs);
	};

	const handleStartOrAdd30s = () => {
		if (status === "paused") {
			actions.startTimer();
		} else if (status === "running") {
			actions.addTime(30000);
		} else {
			actions.setTime(30000);
			actions.startTimer();
		}
	};

	const handlePauseOrCancel = () => {
		if (status === "running") {
			actions.pauseTimer();
		} else {
			actions.stopTimer();
		}
	};

	const handlePresetProgram = (program: Presets) => {
		actions.selectProgram(program);
		actions.setTime(presetPrograms[program].ms);
	};

	return (
		<div className="border border-sky-600 bg-sky-600 flex-1 p-1 w-full h-full rounded-xl text-sm">
			<div className=" flex items-start justify-center text-slate-50 bg-slate-800 rounded-xl text-4xl p-2">
				<div
					className={twMerge(
						"relative w-full text-center",
						status === "paused" && "animate-pulse",
					)}
				>
					{formatTime(time)}
					<span className="absolute transform -translate-y-1/2 top-1/2 right-3 text-xs text-amber-500">
						{status === "paused" && "Pausado"}
					</span>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-2 mt-2 w-full">
				{Object.keys(presetPrograms).map((program) => (
					<PanelButton
						key={program}
						onClick={() => handlePresetProgram(program as Presets)}
						className={selectedProgram === program ? "bg-sky-700" : ""}
					>
						{presetPrograms[program as Presets].img} {program}
					</PanelButton>
				))}
			</div>

			<div className="grid grid-cols-3 gap-2 mt-2 w-full">
				{Array.from({ length: 9 }, (_, i) => (
					<PanelButton
						key={i.toString()}
						onClick={() => handleNumberInput(i + 1)}
						className="font-bold text-lg"
					>
						{i + 1}
					</PanelButton>
				))}
				<PanelButton
					className="text-amber-500 font-medium"
					onClick={handlePauseOrCancel}
				>
					{status === "running" ? "Pausar" : "Cancelar"}
				</PanelButton>
				<PanelButton
					onClick={() => handleNumberInput(0)}
					className="font-bold text-lg"
				>
					0
				</PanelButton>
				<PanelButton
					className="text-cyan-300 font-medium"
					onClick={handleStartOrAdd30s}
				>
					{status === "paused"
						? "Continuar"
						: status === "running"
							? "+30s"
							: "Iniciar 30s"}
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
