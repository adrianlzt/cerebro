Componente para poder engancharnos a eventos externos: kafka, redis, mqtt, k8s events, etc

You can trigger your app with events coming in from external systems, or invoke external systems
Dapr provee gestión de errores y reintentos.
Nos permite crear apps más desacopladas.

Tiene que existir un adaptor para poder hablar con los distintos elementos externos, mirar docs/concepts/bindings/Readme.md para ver los disponibles.

Ejemplo de ruta con la doc de como configurar redis como binding:
docs/concepts/bindings/specs/redis.md

Implementaciones en github.com/dapr/components-contrib/bindings

# Input bindings
Llamar a nuestra app cuando ocurre un evento fuera.

# Output bindings
Invocar desde nuestras apps a elementos externos.
