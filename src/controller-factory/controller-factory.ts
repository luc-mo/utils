import express from 'express'
import cors from 'cors'
import type { Express, Router } from 'express'
import type { CorsOptions } from 'cors'
import type { IApp, IController, IAppConfig, IControllerConfig } from './types'

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
		this._applyCors(router, corsOptions)

		endpoints.forEach((endpoint) => {
			if (!endpoint.overrides) return
			router[endpoint.method](endpoint.path, ...endpoint.overrides)
		})
		middlewares.forEach((middleware) => {
			router.use(middleware)
		})
		endpoints.forEach((endpoint) => {
			router[endpoint.method](endpoint.path, ...(endpoint.middlewares ?? []), endpoint.handler)
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
}
