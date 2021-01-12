import { Thunder } from "../generated/graphql-zeus";

const client = Thunder(fetch);

export async function good() {
	const result = await client.query({
		getCat: [
			{ id: "test" },
			{
				id: true,
				isCat: true,
				relatedCats: [{ first: 10 }, { id: true, isCat: true }],
			},
		],
	});

	type ReturnedCatType = NonNullable<typeof result["getCat"]>;

	// Correct

	type RelatetdCats = ReturnedCatType["relatedCats"];
	// (property) relatedCats: {
	//     id: string;
	//     isCat: boolean;
	// }[] | undefined

	return result;
}

export async function wrong() {
	const result = await client.query({
		getCatOrDog: [
			{ id: "test" },
			{
				id: true,
				"...on Cat": {
					isCat: true,
					relatedCats: [{ first: 10 }, { id: true, isCat: true }],
				},
			},
		],
	});

	type ReturnedCatType = NonNullable<typeof result["getCatOrDog"]>;

	// Wrong

	type RelatetdCats = ReturnedCatType["relatedCats"];

	// (property) relatedCats: [{
	//     first: number;
	// }, {
	//     id: unknown;
	//     isCat: unknown;
	// }][] | undefined

	return result;
}
