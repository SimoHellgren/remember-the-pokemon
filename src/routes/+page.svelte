<script>
	import Pokemon from './Pokemon.svelte';
	export let data;
	let hints = false;

	let pokemon = data.pokemon.map((row, i) => ({
		id: i + 1,
		name: row.name,
		hint: false,
		solved: false
	}));

	let guess = '';
	$: {
		let match = pokemon.find((p) => p.name === guess.toLowerCase() && !p.solved);
		if (match) {
			pokemon = pokemon.map((p) => (p.id === match.id ? { ...match, solved: true } : p));
			guess = '';
		}
	}

	const toggleHints = () => {
		hints = !hints;
		pokemon = pokemon.map((p) => ({ ...p, hint: hints }));
	};
</script>

<div class="controls">
	<input bind:value={guess} placeholder="type here" />
	<button on:click={toggleHints}>{hints ? 'Hints on' : 'Hints off'}</button>
	<label>
		Progress: {pokemon.filter((p) => p.solved).length} / {pokemon.length}
		<progress value={pokemon.filter((p) => p.solved).length} max={pokemon.length} /></label
	>
</div>

<div class="container">
	{#each pokemon as pokeman}
		<Pokemon
			id={pokeman.id}
			name={pokeman.name}
			bind:hint={pokeman.hint}
			bind:solved={pokeman.solved}
			on:click
		/>
	{/each}
</div>

<style>
	.controls {
		position: fixed;
		left: 0;
		top: 0;
		height: 3rem;
		width: 100%;
		background-color: #ffffff;
		display: inline;
	}
	.container {
		margin-top: 3rem;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
</style>
