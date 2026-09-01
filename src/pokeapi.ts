import { Cache } from "./pokecache.js";

export class PokeAPI {
	private static readonly baseURL = "https://pokeapi.co/api/v2";
	private cacheService: Cache;

	constructor() {
		this.cacheService = new Cache(10000);
	}

	async fetchLocations(pageURL: string | null): Promise<ShallowLocations> {
		const url = pageURL ? pageURL : 'https://pokeapi.co/api/v2/location-area/?offset=0&limit=20';

		let entiry = this.cacheService.get(url)
		if (!entiry) {
			const response = await fetch(url);
			if (!response.ok) throw new Error("Not found");
			const data: ShallowLocations = await response.json();
			this.cacheService.add(url, data)
			return data;
		}
		console.log("CACHE USED !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
		return entiry as ShallowLocations
	}

	async fetchLocation(locationName: string): Promise<DeepLocation> {
		const url = PokeAPI.baseURL + "/location-area/" + locationName
		let entiry = this.cacheService.get(url)
		if (!entiry) {
			const response = await fetch(url);
			if (!response.ok) throw new Error("Not found");
			const data: DeepLocation = await response.json();
			this.cacheService.add(url, data)
			return data;
		}
		console.log("CACHE USED !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
		return entiry as DeepLocation
	}

	async fetchPokemon(pokemonName: string): Promise<DeepPokemon> {
		const url = PokeAPI.baseURL + "/pokemon/" + pokemonName
		let entiry = this.cacheService.get(url)
		if (!entiry) {
			const response = await fetch(url);
			if (!response.ok) throw new Error("Not found");
			const data = await response.json();
			this.cacheService.add(url, data)
			return data;
		}
		console.log("CACHE USED !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
		return entiry as DeepPokemon
	}
}

export type DeepPokemon = {
	id: number
	name: string
	base_experience: number
	height: number
	is_default: boolean
	order: number
	weight: number
	abilities: Array<{
		is_hidden: boolean
		slot: number
		ability: {
			name: string
			url: string
		}
	}>
	past_abilities: Array<{
		generation: {
			name: string
			url: string
		}
		abilities: Array<{
			is_hidden: boolean
			slot: number
			ability: any
		}>
	}>
	forms: Array<{
		name: string
		url: string
	}>
	game_indices: Array<{
		game_index: number
		version: {
			name: string
			url: string
		}
	}>
	held_items: Array<{
		item: {
			name: string
			url: string
		}
		version_details: Array<{
			rarity: number
			version: {
				name: string
				url: string
			}
		}>
	}>
	location_area_encounters: string
	moves: Array<{
		move: {
			name: string
			url: string
		}
		version_group_details: Array<{
			level_learned_at: number
			version_group: {
				name: string
				url: string
			}
			move_learn_method: {
				name: string
				url: string
			}
			order?: number
		}>
	}>
	species: {
		name: string
		url: string
	}
	sprites: {
		other: {
			home: {
				front_shiny: string
				front_female: string
				front_default: string
				front_shiny_female: string
			}
			showdown: {
				back_shiny: string
				back_female: string
				front_shiny: string
				back_default: string
				front_female: string
				front_default: string
				back_shiny_female: any
				front_shiny_female: string
			}
			dream_world: {
				front_female: any
				front_default: string
			}
			"official-artwork": {
				front_shiny: string
				front_default: string
			}
		}
		versions: {
			"generation-i": {
				yellow: {
					back_gray: string
					front_gray: string
					back_default: string
					front_default: string
					back_transparent: string
					front_transparent: string
				}
				"red-blue": {
					back_gray: string
					front_gray: string
					back_default: string
					front_default: string
					back_transparent: string
					front_transparent: string
				}
			}
			"generation-v": {
				icons: {
					animated: {
						front_default: string
					}
					front_default: string
				}
				"black-white": {
					animated: {
						back_shiny: string
						back_female: string
						front_shiny: string
						back_default: string
						front_female: string
						front_default: string
						back_shiny_female: string
						front_shiny_female: string
					}
					back_shiny: string
					back_female: string
					front_shiny: string
					back_default: string
					front_female: string
					front_default: string
					back_shiny_female: string
					front_shiny_female: string
				}
			}
			"generation-ii": {
				gold: {
					back_shiny: string
					front_shiny: string
					back_default: string
					front_default: string
					front_transparent: string
				}
				silver: {
					back_shiny: string
					front_shiny: string
					back_default: string
					front_default: string
					front_transparent: string
				}
				crystal: {
					animated: {
						front_shiny: string
						front_default: string
					}
					back_shiny: string
					front_shiny: string
					back_default: string
					front_default: string
					back_transparent: string
					front_transparent: string
					back_shiny_transparent: string
					front_shiny_transparent: string
				}
			}
			"generation-iv": {
				platinum: {
					back_shiny: string
					back_female: string
					front_shiny: string
					back_default: string
					front_female: string
					front_default: string
					back_shiny_female: string
					front_shiny_female: string
				}
				"diamond-pearl": {
					back_shiny: string
					back_female: string
					front_shiny: string
					back_default: string
					front_female: string
					front_default: string
					back_shiny_female: string
					front_shiny_female: string
				}
				"heartgold-soulsilver": {
					back_shiny: string
					back_female: string
					front_shiny: string
					back_default: string
					front_female: string
					front_default: string
					back_shiny_female: string
					front_shiny_female: string
				}
			}
			"generation-ix": {
				"scarlet-violet": {
					front_female: any
					front_default: string
				}
			}
			"generation-vi": {
				"x-y": {
					front_shiny: string
					front_female: string
					front_default: string
					front_shiny_female: string
				}
				"omegaruby-alphasapphire": {
					front_shiny: string
					front_female: string
					front_default: string
					front_shiny_female: string
				}
			}
			"generation-iii": {
				emerald: {
					front_shiny: string
					front_default: string
				}
				"ruby-sapphire": {
					back_shiny: string
					front_shiny: string
					back_default: string
					front_default: string
				}
				"firered-leafgreen": {
					back_shiny: string
					front_shiny: string
					back_default: string
					front_default: string
				}
			}
			"generation-vii": {
				icons: {
					front_female: any
					front_default: string
				}
				"ultra-sun-ultra-moon": {
					front_shiny: string
					front_female: string
					front_default: string
					front_shiny_female: string
				}
			}
			"generation-viii": {
				icons: {
					front_female: string
					front_default: string
				}
				"brilliant-diamond-shining-pearl": {
					front_female: any
					front_default: string
				}
			}
		}
		back_shiny: string
		back_female: string
		front_shiny: string
		back_default: string
		front_female: string
		front_default: string
		back_shiny_female: string
		front_shiny_female: string
	}
	cries: {
		latest: string
		legacy: string
	}
	stats: Array<{
		base_stat: number
		effort: number
		stat: {
			name: string
			url: string
		}
	}>
	past_stats: Array<{
		generation: {
			name: string
			url: string
		}
		stats: Array<{
			base_stat: number
			effort: number
			stat: {
				name: string
				url: string
			}
		}>
	}>
	types: Array<{
		slot: number
		type: {
			name: string
			url: string
		}
	}>
	past_types: Array<any>
}

export interface ShallowLocations {
	count: number
	next: string | null
	previous: string | null
	results: Location[]
}


export interface DeepLocation {
	id: number
	name: string
	game_index: number
	encounter_method_rates: EncounterMethodRate[]
	location: Location
	names: Name[]
	pokemon_encounters: PokemonEncounter[]
}

export interface EncounterMethodRate {
	encounter_method: EncounterMethod
	version_details: VersionDetail[]
}

export interface EncounterMethod {
	name: string
	url: string
}

export interface VersionDetail {
	rate: number
	version: Version
}

export interface Version {
	name: string
	url: string
}

export interface Location {
	name: string
	url: string
}

export interface Name {
	name: string
	language: Language
}

export interface Language {
	name: string
	url: string
}

export interface PokemonEncounter {
	pokemon: Pokemon
	version_details: VersionDetail2[]
}

export interface Pokemon {
	name: string
	url: string
}

export interface VersionDetail2 {
	version: Version2
	max_chance: number
	encounter_details: EncounterDetail[]
}

export interface Version2 {
	name: string
	url: string
}

export interface EncounterDetail {
	min_level: number
	max_level: number
	chance: number
	method: Method
	condition_values: any[]
	pokemon_details: any
}

export interface Method {
	name: string
	url: string
}
