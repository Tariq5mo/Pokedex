import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
	try {
		if (args.length < 1) {
			throw new Error("You should enter a Pokemon")
		}
		const pokemon = await state.PokeAPIObject.fetchPokemon(args[0]);
		console.log(`Throwing a Pokeball at ${pokemon.name}...`);
		const chanceToCatch = 1 - pokemon.base_experience / 200;
		const roll = Math.random();
		// caught when roll is less than chanceToCatch
		if (roll < chanceToCatch) {
			state.userPokedex[args[0]] = pokemon;
			console.log(`${pokemon.name} was caught!`);
			console.log("You may now inspect it with the inspect command.");
		} else {
			console.log(`${pokemon.name} escaped!`);
		}
	} catch (error) {
		console.error(error);
	}
}