export async function load({ fetch, params }) {
    let response = await fetch(`https://pokeapi.co/api/v2/generation/${params.id}`)
    let data = await response.json()

    let pokemon = await data.pokemon_species

    // preprocess
    pokemon = pokemon
        // get id from url and sort ascending
        .map(p => ({ id: parseInt(p.url.split("/").slice(-2)[0]), name: p.name }))
        .sort((a, b) => a.id < b.id ? -1 : 1)

        // handle a few special names
        .map(p => p.name.includes("nidoran") ? { ...p, name: "nidoran" } : p)
        .map(p => p.name === "mr-mime" ? { ...p, name: "mr mime" } : p)

    return { pokemon }
}