import { Cache, CacheEntry } from "./pokecache.js";

export class PokeAPI {
	private static readonly baseURL = "https://pokeapi.co/api/v2";
	private cacheService;

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
