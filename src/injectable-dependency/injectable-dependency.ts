import type { IDependencyMap } from './types'

/**
 * Mixin para crear una clase base con dependencias inyectadas como propiedades protegidas con prefijo `_`.
 *
 * Para configurar las dependencias disponibles, debes extender la interfaz `IDependencyMap`
 * mediante aumento de modulos para mapear las claves de dependencias a sus tipos.
 *
 * @example
 * ```ts
 * import type { IContainer } from './path/to/container'
 *
 * declare module '@snowdrive/utils' {
 *   export interface IDependencyMap extends IContainer {}
 * }
 * ```
 */
export function InjectableDependency<Keys extends keyof IDependencyMap>(...keys: Keys[]) {
	type IDependencies = Pick<IDependencyMap, Keys>

	type IPrefixed<T extends Record<string, any>> = {
		readonly [K in keyof T as `_${string & K}`]: T[K]
	}

	abstract class Base {
		constructor(dependencies: IDependencies) {
			for (const key of keys) {
				;(this as any)[`_${String(key)}`] = dependencies[key]
			}
		}
	}

	return Base as abstract new (
		dependencies: IDependencies
	) => IPrefixed<IDependencies>
}
