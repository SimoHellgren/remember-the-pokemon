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
		let match = pokemon.find((p) => p.name === guess.toLowerCase());
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

<input bind:value={guess} placeholder="type here" />
<button on:click={toggleHints}>{hints ? 'Hints on' : 'Hints off'}</button>
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
	.container {
		display: flex;
		flex-wrap: wrap;
	}
</style>
