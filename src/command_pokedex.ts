import { State } from "./state.js";

export async function commandPokede(state: State) {
	try {
		const pokemon = state.userPokedex;
		if (Object.keys(pokemon).length === 0) {
			console.log("you have not caught any pokemon");
			return;
		}

		console.log("Your Pokedex:");
		for (const key in pokemon) {
			console.log(`  - ${pokemon[key].name}`);
		}
	} catch (error) {
		console.error(error);
	}
}