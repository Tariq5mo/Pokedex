// repl.js actually refers to repl.ts
import { startREPL } from "./repl.js";
import { initState } from "./state.js";

function main() {
	const initRepl = initState();
	startREPL(initRepl);
}

main();