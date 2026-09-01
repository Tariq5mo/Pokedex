import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { DeepPokemon, PokeAPI } from "./pokeapi.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";

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
	userPokedex: Record<string, DeepPokemon>,
}

export function initState(): State {
	const rl = createInterface({ input: process.stdin, output: process.stdout, prompt: "Pokedex > " })
	const pokeAPIObject = new PokeAPI()
	const userPokedex: Record<string, DeepPokemon> = {}
	return {
		readline: rl,
		userPokedex: userPokedex,
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
				name: "explore <name>",
				description: "Displays a list of all the Pokémon in a given area.",
				callback: commandExplore,
			},
			catch: {
				name: "catch <name>",
				description: "Catching Pokemon adds them to the user's Pokedex.",
				callback: commandCatch,
			},
			inspect: {
				name: "inspect <name>",
				description: "Inspect a Pokemon",
				callback: commandInspect,
			},
		},
		PokeAPIObject: pokeAPIObject,
		nextLocationsURL: null,
		prevLocationsURL: null
	};
}
