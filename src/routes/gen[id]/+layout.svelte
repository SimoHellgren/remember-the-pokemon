<script>
	export let data;
</script>

<nav>
	{#each data.generations as g}
		<a href={`gen${g}`}>Gen {g}</a>
	{/each}
</nav>

<slot />
