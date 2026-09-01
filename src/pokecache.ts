import { DeepLocation, ShallowLocations } from "./pokeapi.js";

export type CacheEntry<T> = {
	createdAt: number,
	val: T
}

export class Cache {
	#cache = new Map<string, CacheEntry<any>>();
	#reapIntervalId: NodeJS.Timeout | undefined = undefined;
	#interval: number

	constructor(interval: number) {
		this.#interval = interval;
		this.#startReapLoop()
	}

	add<T>(key: string, val: T) {
		const value: CacheEntry<T> = {
			createdAt: Date.now(),
			val: val
		}
		return this.#cache.set(key, value)
	}

	get<T>(key: string): DeepLocation| ShallowLocations | undefined {
		const entiry = this.#cache.get(key)
		return entiry?.val
	}

	#reap() {
		const cutoff = Date.now() - this.#interval;
		for (const [key, value]  of this.#cache.entries()) {
			if (value.createdAt <= cutoff){ this.#cache.delete(key)
			}
		}
	}

	#startReapLoop() {
		this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
	}

	stopReapLoop() {
		clearInterval(this.#reapIntervalId);
		this.#reapIntervalId = undefined;
	}
}
