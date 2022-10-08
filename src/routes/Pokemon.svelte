<script>
	export let id;
	export let name;
	export let hint;
	export let solved;

	const urlTemplate = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
	let placeholder = urlTemplate + '0.png';
	let image = urlTemplate + id + '.png';
</script>

<div on:click={() => (hint = !hint)} class="container">
	{#if !solved}
		{#if hint}
			<img src={image} class="silhouette" alt="Who's that Pokémon?" />
		{:else}
			<img src={placeholder} alt="Who's that Pokémon?" />
		{/if}
	{:else}
		<img src={image} alt={name} />
		<p>#{id} {name.toUpperCase()}</p>
	{/if}
</div>

<style>
	.container {
		text-align: center;
	}
	.silhouette {
		filter: grayscale(1) contrast(0);
	}
</style>
