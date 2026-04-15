import express from 'express'
import cors from 'cors'
import type { Express, Router, RequestHandler } from 'express'
import type { CorsOptions } from 'cors'
import type { IApp, IController, IAppConfig, IControllerConfig, IMiddlewareConfig } from './types'

export class ControllerFactory {
	public createApp({ port, middlewares, controllers, corsOptions }: IAppConfig): IApp {
		const router = express()
		this._applyCors(router, corsOptions)

		middlewares.forEach((middleware) => {
			router.use(middleware)
		})
		controllers.forEach((controller) => {
			router.use(controller.path, controller.router)
		})

		return {
			port,
			router,
			listen: (cb) => {
				router.listen(port, cb)
			},
		}
	}

	public createController({
		type = 'router',
		path,
		middlewares,
		endpoints,
		corsOptions,
	}: IControllerConfig): IController {
		const router = type === 'app' ? express() : express.Router()
		const separatedMiddlewares = this._separateMiddlewares(middlewares)
		this._applyCors(router, corsOptions)

		separatedMiddlewares.nonOverrideable.forEach((middleware) => {
			router.use(middleware)
		})

		endpoints.forEach((endpoint) => {
			const separatedMiddlewares = this._separateMiddlewares(endpoint.middlewares ?? [])
			if (!separatedMiddlewares.nonOverrideable.length) return
			router[endpoint.method](endpoint.path, ...separatedMiddlewares.nonOverrideable)
		})

		endpoints.forEach((endpoint) => {
			if (!endpoint.overrides) return
			router[endpoint.method](endpoint.path, ...endpoint.overrides)
		})

		separatedMiddlewares.overrideable.forEach((middleware) => {
			router.use(middleware)
		})

		endpoints.forEach((endpoint) => {
			const separatedMiddlewares = this._separateMiddlewares(endpoint.middlewares ?? [])
			router[endpoint.method](endpoint.path, ...separatedMiddlewares.overrideable, endpoint.handler)
		})

		return { path, router }
	}

	private _applyCors(router: Express | Router, corsOptions?: boolean | CorsOptions) {
		if (corsOptions === true) {
			router.use(cors())
		}

		if (corsOptions && corsOptions !== true) {
			router.use(cors(corsOptions))
		}
	}

	private _separateMiddlewares(middlewares: IMiddlewareConfig[]) {
		const overrideable: RequestHandler[] = []
		const nonOverrideable: RequestHandler[] = []
		middlewares.forEach((middleware) => {
			if (typeof middleware === 'function') {
				overrideable.push(middleware)
				return
			} else if (middleware.overrideable) {
				overrideable.push(middleware.handler)
			} else {
				nonOverrideable.push(middleware.handler)
			}
		})
		return { overrideable, nonOverrideable }
	}
}
