# @snowdrive/utils
Colección de utilidades reutilizables desarrolladas en TypeScript.

## Instalación
```bash
npm install @snowdrive/utils
pnpm add @snowdrive/utils
```

Si utilizas el namespace `Http`, instala las peer dependencies:

```bash
npm install express cors
pnpm add express cors
```

## Uso
Puedes importar la librería completa o por subpath para mejor tree-shaking:
```typescript
// Completo
import { Http, DI } from '@snowdrive/utils'

// Por subpath
import { Http } from '@snowdrive/utils/http'
import { DI } from '@snowdrive/utils/di'
```

## Namespaces

### `Http`
Utilidades para crear aplicaciones y controladores Express.

```typescript
const factory = new Http.ControllerFactory()

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

### `DI`
Mixin para inyección de dependencias compatible con Awilix.

```typescript
class UserService extends DI.InjectableDependency('userRepository') {
  getUsers() {
    return this._userRepository.findAll()
  }
}
```

## Scripts
- `build`: Compila el proyecto con `tsup`.
- `lint`: Revisa y corrige el código con Biome.
- `format`: Formatea el código con Biome.

## Licencia
MIT