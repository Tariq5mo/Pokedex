import { State } from "./state.js";

export async function commandHelp(repl: State) {
	console.log(`Welcome to the Pokedex!
Usage:
`);
	for (const com in repl.commands)
		console.log(repl.commands[com].description)
}