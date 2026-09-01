import { State } from "./state.js";

export async function commandMapb(repl: State) {
	if (!repl.prevLocationsURL) {
		console.log("you're on the first page");
		return;
	}
	const res = await repl.PokeAPIObject.fetchLocations(repl.prevLocationsURL)
	repl.nextLocationsURL = res.next;
	repl.prevLocationsURL = res.previous;
	const location = res.results.map(location => location.name);
	console.log(location.join("\n"));
}