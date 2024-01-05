export async function load({ fetch }) {
  let response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
  let data = await response.json()

  let pokemon = await data.results

  // preprocess certain names
  pokemon = pokemon
    .map(p => p.name.includes("nidoran") ? { ...p, name: "nidoran" } : p)
    .map(p => p.name === "mr-mime" ? { ...p, name: "mr mime" } : p)

  return {
    pokemon
  }
}
