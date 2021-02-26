import { Thunder } from "../generated/zeus";

const client = Thunder(fetch);

export async function good() {
	const result = await client.query({
		getCat: [
			{ id: "test" },
			{
				id: true,
				__typename: true,
			},
		],
	});

	// Correct
	type ReturnedCatType = NonNullable<typeof result["getCat"]>;
	// {
	// 	id: string;
	// 	__typename: "Cat";
	// }

	return result;
}

export async function wrong() {
	const result = await client.query({
		getCatOrDog: [
			{ id: "test" },
			{
				id: true,
				__typename: true,
			},
		],
	});

	// Might be wrong (missing `__typename`)
	type ReturnedCatType = NonNullable<typeof result["getCatOrDog"]>;
	// {
	// 	id: string;
	// }

	return result;
}
