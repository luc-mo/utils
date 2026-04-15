import type { Express, Router, RequestHandler } from 'express'
import type { CorsOptions } from 'cors'

// Return types
export interface IApp {
	port: string
	router: Express
	listen: (cb: (error?: Error) => void) => void
}

export interface IController<T extends IControllerConfig['type'] = 'router'> {
	path: string
	router: T extends 'app' ? Express : Router
}

// Configs
export interface IAppConfig {
	port: string
	middlewares: RequestHandler[]
	controllers: IController[]
	corsOptions?: boolean | CorsOptions
}

export interface IControllerConfig {
	type?: 'app' | 'router'
	path: string
	middlewares: IMiddlewareConfig[]
	endpoints: IEndpointConfig[]
	corsOptions?: boolean | CorsOptions
}

export interface IEndpointConfig {
	method: 'get' | 'post' | 'put' | 'patch' | 'delete'
	path: string
	overrides?: RequestHandler[]
	middlewares?: IMiddlewareConfig[]
	handler: RequestHandler
}

export type IMiddlewareConfig =
	| RequestHandler
	| {
			overrideable: boolean
			handler: RequestHandler
	  }
