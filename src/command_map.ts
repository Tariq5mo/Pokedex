import { State } from "./state.js";

export async function commandMap(repl: State) {
	const res = await repl.PokeAPIObject.fetchLocations(repl.nextLocationsURL)
	repl.nextLocationsURL = res.next;
	repl.prevLocationsURL = res.previous;
	const location = res.results.map(location => location.name);
	console.log(location.join("\n"));
}