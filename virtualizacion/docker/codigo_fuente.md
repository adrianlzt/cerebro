https://github.com/moby/moby/


# API
api/server/router

Aqui se definen las rutas de la API
Ejemplo: api/server/router/container/container.go
router.NewGetRoute("/containers/json", r.getContainersJSON)
