import { createInterface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./src/command_help.js";
import { CLICommand, initState, State } from "./state.js";

export function startREPL(state: State) {
	const rl = state.readline
	rl.prompt();
	rl.on("line", (input) => {
		const args = cleanInput(input);
		if (args.length < 1) {
			rl.prompt()
			return;
		}
		const userCommand = args[0];
		const commands = state.commands
		if (commands[userCommand]) {
			try {
				commands[userCommand].callback(state)
			} catch (err) {
				if (err instanceof Error) console.log(err);
			}
		} else {
			console.log("Unknown command");
		}
		rl.prompt();
	})
}

export function cleanInput(input: string): string[] {
	let valStr = input.trim();
	const arr = valStr.split(" ").filter((value) => value != "");
	arr.forEach((str, index) => {
		arr[index] = arr[index].trim().toLowerCase();
	});
	return arr;
}
