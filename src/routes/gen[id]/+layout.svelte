<script>
	export let data;
</script>

<nav>
	Choose gen:
	{#each data.generations as g}
		<a href={`gen${g}`} data-sveltekit-reload>{g}</a>
	{/each}
</nav>

<slot />

<style>
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
