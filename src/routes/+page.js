export async function load({ fetch }) {
  let response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
  let data = await response.json()
  return {
    pokemon: await data.results
  }
}