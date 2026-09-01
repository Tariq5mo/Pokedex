import { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]) {
	try {
		if (args.length < 1) {
			throw new Error("You should enter a Pokemon");
		}

		const pokemon = state.userPokedex[args[0]];
		if (!pokemon) {
			console.log("you have not caught that pokemon");
			return;
		}

		console.log(`Name: ${pokemon.name}`);
		console.log(`Height: ${pokemon.height}`);
		console.log(`Weight: ${pokemon.weight}`);
		console.log("Stats:");
		for (const stat of pokemon.stats) {
			console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
		}
		console.log("Types:");
		for (const type of pokemon.types) {
			console.log(`  - ${type.type.name}`);
		}
	} catch (error) {
		console.error(error);
	}
}