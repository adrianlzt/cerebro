<https://chaos-mesh.org/>

Aplicación para lanzar "experimentos" en kubernetes y/o hosts.

Un experimento es lo que queremos realizar.

También podemos concatenar experimentos con workflows.

Tipos de experimentos que tienen definidos:
<https://chaos-mesh.org/docs/simulate-pod-chaos-on-kubernetes/>

Los experimentos son unos "programitas" en go con los métodos Apply y Recover.

Ejemplo del podfailure, que le cambia la imagen de pod:
<https://github.com/chaos-mesh/chaos-mesh/blob/a7bdb8ddc8b82ce7b5a25137a2fbe93c81279946/controllers/chaosimpl/podchaos/podfailure/impl.go>

Crear custom experiments:
<https://chaos-mesh.org/docs/next/add-new-chaos-experiment-type/>

# kubernetes

Parece que hace un patch al contenedor para modificarlo y romperlo como le hayamos definido.

En unos yaml podemos definir los experimentos.
