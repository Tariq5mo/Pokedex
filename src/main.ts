// repl.js actually refers to repl.ts
import { startREPL } from "./repl.js";
import { initState } from "./state.js";

async function main() {
	try {
		const initRepl = await initState();
		await startREPL(initRepl);
	} catch (error) {
		if (error instanceof Error) console.log(error);
	}
}

await main();