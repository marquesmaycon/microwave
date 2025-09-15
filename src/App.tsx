import { Oven } from "./components/oven";
import { Panel } from "./components/panel";
import { MicrowaveProvider } from "./features/microwave-provider";

function App() {
	return (
		<MicrowaveProvider>
			<main className="h-screen bg-slate-900 text-slate-900 flex flex-col items-center justify-center">
				<div className="flex flex-col items-center justify-center gap-4 md:flex-row w-[90%] max-w-5xl border-2 border-sky-600 bg-sky-800 rounded-xl p-2">
					<Oven />
					<Panel />
				</div>
			</main>
		</MicrowaveProvider>
	);
}

export default App;
