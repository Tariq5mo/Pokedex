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
		const [userCommand, ...restArgs] = args;
		const commands = state.commands
		if (commands[userCommand]) {
			try {
				await commands[userCommand].callback(state, ...restArgs)
			} catch (err) {
				if (err instanceof Error) console.log(err.message);
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
