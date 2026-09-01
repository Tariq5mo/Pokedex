import { createInterface, type Interface } from "readline";
import { cleanInput } from "./repl.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { PokeAPI } from "./pokeapi.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";

export type CLICommand = {
	name: string;
	description: string;
	callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
	readline: Interface,
	commands: Record<string, CLICommand>,
	PokeAPIObject: PokeAPI,
	nextLocationsURL: string | null,
	prevLocationsURL: string | null,
}

export function initState(): State {
	const rl = createInterface({ input: process.stdin, output: process.stdout, prompt: "Pokedex > " })
	const pokeAPIObject = new PokeAPI()
	return {
		readline: rl,
		commands: {
			exit: {
				name: "exit",
				description: "Exit the Pokedex",
				callback: commandExit,
			},
			help: {
				name: "help",
				description: "Displays a help message",
				callback: commandHelp,
			},
			map: {
				name: "map",
				description: "Displays the names of 20 location areas in the Pokemon world",
				callback: commandMap,
			},
			mapb: {
				name: "mapb",
				description: "Displays the previous names of 20 location areas in the Pokemon world",
				callback: commandMapb,
			},
			explore: {
				name: "explore",
				description: "Displays a list of all the Pokémon in a given area.",
				callback: commandExplore,
			},
		},
		PokeAPIObject: pokeAPIObject,
		nextLocationsURL: null,
		prevLocationsURL: null
	};
}
