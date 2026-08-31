import { createInterface, type Interface } from "readline";
import { cleanInput } from "./repl.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./src/command_help.js";

export type CLICommand = {
	name: string;
	description: string;
	callback: (state: State) => void;
};

export type State = {
	readline: Interface,
	commands: Record<string, CLICommand>
}

export function initState(): State {
	const rl = createInterface({ input: process.stdin, output: process.stdout, prompt: "Pokedex > " })
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
			}
		}
	};
}
