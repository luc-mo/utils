import { defineConfig } from 'tsup'

export default defineConfig({
	entry: {
		index: 'src/index.ts',
		http: 'src/controller-factory/index.ts',
		di: 'src/injectable-dependency/index.ts',
	},
	format: ['cjs', 'esm'],
	splitting: true,
	tsconfig: './tsconfig.json',
	minify: false,
	clean: true,
	treeshake: true,
	dts: true,
	external: ['express', 'cors'],
})
