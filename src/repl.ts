import { State } from "./state.js";

export async function startREPL(state: State) {
	const rl = state.readline
	rl.prompt();
	rl.on("line", async (input) => {
		const args = cleanInput(input);
		if (args.length < 1) {
			rl.prompt()
			return;
		}
		const userCommand = args[0];
		const commands = state.commands
		if (commands[userCommand]) {
			try {
				console.log(userCommand);
				await commands[userCommand].callback(state)
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
