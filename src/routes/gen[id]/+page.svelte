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
	<nav>
		<span>
			<span>Menu</span>
			<img src="/favicon.png" alt="Menu" />
		</span>
		<ul>
			{#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as gen}
				<li>
					<a href={`/gen${gen}`} data-sveltekit-reload>Gen {gen}</a>
				</li>
			{/each}
		</ul>
	</nav>
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
	:root {
		--animation-duration: 300ms;
	}

	nav {
		display: flex;
		flex-direction: column;
		align-self: flex-start;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		transition: width var(--animation-duration) ease,
			background-color var(--animation-duration) ease, border-style var(--animation-duration) ease;
	}

	nav span {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	nav span > span {
		display: none;
	}

	nav img {
		display: inline-block;
		width: 2rem;
		height: 2rem;
		transform: rotate(0deg);
		transition: transform var(--animation-duration) ease;
	}

	nav:hover {
		background-color: #fefefe;
		border-style: double;
		width: 5rem;
		height: fit-content;
	}

	nav:hover img {
		transform: rotate(360deg);
	}

	nav:hover span > span {
		display: inline-block;
	}

	nav ul {
		display: none;
		list-style: none;
		padding: 0;
		gap: 0.5rem;
	}

	a {
		text-decoration: none;
	}

	nav:hover ul {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.controls {
		position: fixed;
		left: 0;
		top: 0;
		padding-top: 0.5rem;
		padding-left: 0.5rem;
		height: 2rem;
		width: 100%;
		background-color: #ffffff;
		display: flex;
		align-items: center;
		column-gap: 0.3rem;
	}

	.container {
		margin-top: 3rem;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
</style>
