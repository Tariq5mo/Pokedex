import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
	try {
		if (args.length < 1) {
			throw new Error("You should enter a location")
		}
		const res = await state.PokeAPIObject.fetchLocation(args[0])
		const pokemons = res.pokemon_encounters.map(location => location.pokemon.name);
		console.log();
		console.log(`Exploring ${args[0]}...\n` + "Found Pokemon:\n- " + pokemons.join("\n- "));
	} catch (error) {
		console.error(error);
	}
}