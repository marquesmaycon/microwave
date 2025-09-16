import { twMerge } from "tailwind-merge";
import {
	type Presets,
	presetPrograms,
	useMicrowave,
} from "../features/microwave-context";

export const Panel = () => {
	const { state, actions, formatTime } = useMicrowave();

	const handlePresetProgram = (program: Presets) => {
		actions.selectProgram(program);
		actions.setTime(presetPrograms[program].ms);
	};

	const handleNumberInput = (digit: number) => {
		if (state.selectedProgram) return;

		// Converte tempo atual para segundos
		const currentSeconds = Math.floor(state.time / 1000);

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
		if (state.status === "paused") {
			actions.startTimer();
		} else if (state.status === "running") {
			actions.addTime(30000); // +30s
		} else {
			if (state.time > 0) {
				actions.startTimer();
			} else {
				actions.setTime(30000); // Define 30s se não houver tempo
				actions.startTimer();
			}
		}
	};

	const handlePauseOrCancel = () => {
		if (state.status === "running") {
			actions.pauseTimer();
		} else {
			actions.stopTimer();
		}
	};

	return (
		<div className="border border-sky-600 bg-sky-600 flex-1 p-1 w-full h-full rounded-xl text-sm">
			<div className="flex items-start justify-center text-slate-50 bg-slate-800 rounded-xl text-4xl p-2">
				<span className={twMerge(state.status === "paused" && "animate-pulse")}>
					{formatTime(state.time)}
				</span>
			</div>

			<div className="grid grid-cols-3 gap-2 mt-2 w-full">
				{Object.keys(presetPrograms).map((program) => (
					<PanelButton
						key={program}
						onClick={() => handlePresetProgram(program as Presets)}
						className={state.selectedProgram === program ? "bg-sky-700" : ""}
					>
						{program}
					</PanelButton>
				))}
			</div>

			<div className="grid grid-cols-3 gap-2 mt-2 w-full">
				{Array.from({ length: 9 }, (_, i) => (
					<PanelButton
						key={i.toString()}
						onClick={() => handleNumberInput(i + 1)}
					>
						{i + 1}
					</PanelButton>
				))}
				<PanelButton className="text-amber-500" onClick={handlePauseOrCancel}>
					{state.status === "running" ? "Pausar" : "Cancelar"}
				</PanelButton>
				<PanelButton onClick={() => handleNumberInput(0)}>0</PanelButton>
				<PanelButton className="text-cyan-300" onClick={handleStartOrAdd30s}>
					{state.status === "paused"
						? "Continuar"
						: state.status === "running"
							? "+30s"
							: "Iniciar 30s"}
				</PanelButton>
			</div>

			<div className="mt-2 text-center text-slate-50 text-xs">
				Status:{" "}
				{state.status === "idle"
					? "Parado"
					: state.status === "running"
						? "Funcionando"
						: "Pausado"}
				{state.selectedProgram && ` | Programa: ${state.selectedProgram}`}
				{state.time}
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
