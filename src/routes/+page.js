export async function load({ fetch }) {
  let response = await fetch("https://pokeapi.co/api/v2/generation")
  let data = await response.json()

  let generations = await data.results

  generations = generations.map(g => parseInt(g.url.split("/").slice(-2, -1)[0])).sort()

  return { generations }
}
