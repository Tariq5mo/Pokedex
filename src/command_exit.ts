import process from "process";
import { State } from "./state.js";

export async function commandExit(repl: State) {
	console.log("Closing the Pokedex... Goodbye!");
	repl.readline.close()
	process.exit(0);

}