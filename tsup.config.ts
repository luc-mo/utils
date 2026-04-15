import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['cjs', 'esm'],
	tsconfig: './tsconfig.json',
	minify: true,
	clean: true,
	treeshake: true,
	dts: true,
	external: ['express', 'cors'],
})
