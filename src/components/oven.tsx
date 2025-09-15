import { twMerge } from "tailwind-merge";

import { presetPrograms, useMicrowave } from "../features/microwave-context";

export const Oven = () => {
	const { state } = useMicrowave();
	const running = state.status === "running";
	return (
		<div className="border-12 border-sky-600 bg-amber-200 flex-2 w-full h-full rounded-xl">
			<div
				className={twMerge(
					"w-full h-full flex items-center justify-center rounded text-2xl",
					running && "animate-gradient-wave",
				)}
			>
				<span className={twMerge("text-9xl", running && "animate-bounce")}>
					{state.selectedProgram
						? presetPrograms[state.selectedProgram]?.img
						: state.status !== "idle"
							? "🥦"
							: ""}
				</span>
			</div>
		</div>
	);
};
