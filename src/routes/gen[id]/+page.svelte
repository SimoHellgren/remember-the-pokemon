<script>
	import Pokemon from '../Pokemon.svelte';
	export let data;

	let elapsed = 0;
	let timer = setInterval(() => elapsed++, 1000);

	$: minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
	$: seconds = String(elapsed % 60).padStart(2, '0');

	let pokemon = data.pokemon.map((p) => ({
		id: p.id,
		name: p.name,
		hint: false,
		solved: false
	}));

	let hints = false;
	const setHints = (hints) => pokemon.map((p) => ({ ...p, hint: hints }));
	$: pokemon = setHints(hints);

	$: total = pokemon.length;
	$: guessed = pokemon.filter((p) => p.solved).length;

	$: {
		if (guessed >= total) clearInterval(timer);
	}

	let guess = '';
	$: {
		let match = pokemon.find((p) => p.name === guess.toLowerCase() && !p.solved);
		if (match) {
			pokemon = pokemon.map((p) => (p.id === match.id ? { ...match, solved: true } : p));
			guess = '';
		}
	}
</script>

<div class="controls">
	<input autofocus bind:value={guess} placeholder="type here" />
	<label>
		Show all hints:
		<input type="checkbox" bind:checked={hints} />
	</label>
	<label>
		Progress: {guessed} / {total}
		<progress value={guessed} max={total} />
	</label>
	<span>Time elapsed: {minutes}:{seconds}</span>
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
