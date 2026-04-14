import { ControllerFactory as _ControllerFactory } from './controller-factory'
import type {
	IApp as _IApp,
	IController as _IController,
	IAppConfig as _IAppConfig,
	IControllerConfig as _IControllerConfig,
	IEndpointConfig as _IEndpointConfig,
} from './types'

export namespace Http {
	export const ControllerFactory = _ControllerFactory
	export type IApp = _IApp
	export type IController = _IController
	export type IAppConfig = _IAppConfig
	export type IControllerConfig = _IControllerConfig
	export type IEndpointConfig = _IEndpointConfig
}
