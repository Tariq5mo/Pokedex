import { describe, expect, test, vi } from "vitest";
import { commandInspect } from "./command_inspect.js";

describe("commandInspect", () => {
	test("prints the caught pokemon details in the expected format", async () => {
		const state = {
			userPokedex: {
				pidgey: {
					name: "pidgey",
					height: 3,
					weight: 18,
					stats: [
						{ base_stat: 40, stat: { name: "hp" } },
						{ base_stat: 45, stat: { name: "attack" } },
						{ base_stat: 40, stat: { name: "defense" } },
						{ base_stat: 35, stat: { name: "special-attack" } },
						{ base_stat: 35, stat: { name: "special-defense" } },
						{ base_stat: 56, stat: { name: "speed" } },
					],
					types: [
						{ type: { name: "normal" } },
						{ type: { name: "flying" } },
					],
				},
			},
		} as any;

		const logSpy = vi.spyOn(console, "log").mockImplementation(() => { });

		await commandInspect(state, "pidgey");

		expect(logSpy.mock.calls.map(([msg]) => String(msg))).toEqual([
			"Name: pidgey",
			"Height: 3",
			"Weight: 18",
			"Stats:",
			"  -hp: 40",
			"  -attack: 45",
			"  -defense: 40",
			"  -special-attack: 35",
			"  -special-defense: 35",
			"  -speed: 56",
			"Types:",
			"  - normal",
			"  - flying",
		]);

		logSpy.mockRestore();
	});
});
