Mirar install.md para desplegarlo.

# Operador
Encargado de gestionar el CRD components.dapr.io con el que se desplegarán los componentes como el state store, etc
Tenemos que tener ya el "backend" (por ejemplo, redis) sobre el que se montará el "component".

Ejemplo para crear un components que configurará el statestore para usar un redis ya desplegado:
En producción habría que gestionar bien los secrets (https://github.com/dapr/docs/blob/master/concepts/components/secrets.md):

apiVersion: dapr.io/v1alpha1
kind: Component
metadata:
  name: statestore
spec:
  type: state.redis
  metadata:
  - name: "redisHost"
    value: "redis-master:6379"
  - name: "redisPassword"
    value: "abcdefg1234"

Para levantar un redis sin cluster y sin persistencia con helm3:
helm3 install redis stable/redis --set cluster.enabled=false,master.persistence.enabled=false
