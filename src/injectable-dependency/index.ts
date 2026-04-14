import { InjectableDependency as _InjectableDependency } from './injectable-dependency'
import type { IDependencyMap as _IDependencyMap } from './types'

export namespace DI {
	export const InjectableDependency = _InjectableDependency
	export type IDependencyMap = _IDependencyMap
}
