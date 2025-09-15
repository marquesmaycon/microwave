import { Panel } from "./components/panel";

function App() {
	return (
		<main className="h-screen bg-slate-900 text-slate-900 flex flex-col items-center justify-center">
			<div className="flex flex-col items-center justify-center gap-4 md:flex-row w-[80%] max-w-5xl border-2 border-sky-600 bg-sky-800 rounded-xl p-2">
				<div className="border-12 border-sky-600 bg-sky-600 flex-2 w-full h-full rounded-xl">
					<div className="w-full h-full bg-amber-200 rounded-xl flex items-center justify-center text-2xl font-bold text-amber-900"></div>
				</div>
				<Panel />
			</div>
		</main>
	);
}

export default App;
