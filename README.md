# @snowdrive/utils

Colección de utilidades reutilizables desarrolladas en TypeScript.

## Instalación

```bash
npm install @snowdrive/utils
pnpm add @snowdrive/utils
```

Si utilizas `ControllerFactory`, instala las peer dependencies:

```bash
npm install express cors
pnpm add express cors
```

## Uso

```typescript
import { ControllerFactory, InjectableDependency } from '@snowdrive/utils'
```

## API

### `ControllerFactory`

Utilidades para crear aplicaciones y controladores Express.

```typescript
const factory = new ControllerFactory()

const controller = factory.createController({
  path: '/users',
  middlewares: [],
  endpoints: [
    {
      method: 'get',
      path: '/',
      handler: (req, res) => res.json({ users: [] }),
    },
  ],
})

const app = factory.createApp({
  port: '3000',
  middlewares: [],
  controllers: [controller],
})

app.listen()
```

### `InjectableDependency`

Mixin para inyección de dependencias compatible con Awilix.

```typescript
declare module '@snowdrive/utils' {
  interface IDependencyMap {
    userRepository: UserRepository
  }
}

class UserService extends InjectableDependency('userRepository') {
  getUsers() {
    return this._userRepository.findAll()
  }
}
```

## Licencia
MIT