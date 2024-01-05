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
	img {
		width: 96px;
		height: 96px;
	}
	.container {
		text-align: center;
		background-color: #f4f4f4;
		padding: 0.5rem;
		box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
	}
	.silhouette {
		filter: grayscale(1) contrast(0);
	}
</style>
