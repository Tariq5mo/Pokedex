export class PokeAPI {
	private static readonly baseURL = "https://pokeapi.co/api/v2";

	constructor() { }

	async fetchLocations(pageURL: string | null): Promise<ShallowLocations> {
		const response = await fetch(pageURL ? pageURL : "https://pokeapi.co/api/v2/location-area/")
		return response.json()
	}

	async fetchLocation(locationName: string): Promise<DeepLocation> {
		const response = await fetch(PokeAPI.baseURL + "/location-area/" + locationName)
		return response.json()
	}
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
