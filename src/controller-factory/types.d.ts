import type { Express, Router, RequestHandler, json } from 'express'
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
	jsonOptions?: boolean | Parameters<typeof json>[0]
	corsOptions?: boolean | CorsOptions
}

export interface IControllerConfig {
	type?: 'app' | 'router'
	path: string
	middlewares: RequestHandler[]
	endpoints: IEndpointConfig[]
	jsonOptions?: boolean | Parameters<typeof json>[0]
	corsOptions?: boolean | CorsOptions
}

export interface IEndpointConfig {
	method: 'get' | 'post' | 'put' | 'patch' | 'delete'
	path: string
	overrides?: RequestHandler[]
	middlewares?: RequestHandler[]
	handler: RequestHandler
}
