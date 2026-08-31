export function cleanInput(input: string): string[] {
	let valStr = input.trim();
	const arr =  valStr.split(" ").filter((value) => value != "");
	arr.forEach((str, index) => {
		arr[index] = arr[index].trim().toLowerCase();
	});
	return arr;
}
