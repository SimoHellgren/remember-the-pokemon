import { sveltekit } from '@sveltejs/kit/vite';

const config = {
	plugins: [sveltekit()],
	build: {
		outDir: '/var/www/pokemon',
		emptyOutDir: true,
	}
};

export default config;
