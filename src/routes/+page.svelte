<script>
	export let data;
</script>

<h1>Remember the Pokémon?</h1>

<h2>Pick a generation:</h2>
<ul>
	{#each data.generations as generation}
		<li>
			<a href={`gen${generation}`}>Gen {generation}</a>
		</li>
	{/each}
</ul>

<style>
	li {
		list-style-type: none;
		padding: 0.5rem;
	}
</style>
