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
	<span>
		Choose gen:
		<nav>
			{#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as gen}
				<a href={`/gen${gen}`} data-sveltekit-reload>{gen}</a>
			{/each}
		</nav>
	</span>
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
		padding-top: 0.5rem;
		padding-left: 0.5rem;
		height: 2rem;
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

	nav {
		display: inline;
	}

	a {
		background-color: #ebb5e6;
		border: 1px solid #b885b4;
		border-radius: 3px;
		padding: 0.2rem 0.5rem 0.2rem 0.5rem;
		margin: 0.1rem;
		text-align: center;
		width: fit-content;
		text-decoration: none;
	}
</style>
