import { createInterface } from "readline";

export function startREPL() {
	const rl = createInterface({ input: process.stdin, output: process.stdout, prompt: "Pokedex > "})
	rl.prompt()
	rl.on("line", (input) => {
		const args = cleanInput(input);
		if (args.length < 1) {
			rl.prompt()
			return;
		}
		console.log(`Your command was: ${args[0]}`);
		rl.prompt();
	})
}

export function cleanInput(input: string): string[] {
	let valStr = input.trim();
	const arr =  valStr.split(" ").filter((value) => value != "");
	arr.forEach((str, index) => {
		arr[index] = arr[index].trim().toLowerCase();
	});
	return arr;
}
