# Analisis de como openshift 3.5 / kubernetes 1.5 selecciona un nodo para un pod

Aqui se llama a la funcion que debera encontrar un nodo para el pod
https://github.com/kubernetes/kubernetes/blob/v1.5.7/plugin/pkg/scheduler/generic_scheduler.go#L118
  filteredNodes, failedPredicateMap, err := findNodesThatFit(pod, g.cachedNodeInfoMap, nodes, g.predicates, g.extenders, g.predicateMetaProducer)


En caso de no encontrar ningun nodo (len(filteredNodes) == 0) se generará un error:
"pod (%s) failed to fit in any node\n"

Ejemplo real del error:
E0905 14:14:40.852773  110572 factory.go:583] Error scheduling dsmc-monitoring prueba-1-deploy: pod (prueba-1-deploy) failed to fit in any node
fit failure summary on nodes : CheckServiceAffinity (5), MatchNodeSelector (5); retrying


La función que debe buscar el nodo:
// Filters the nodes to find the ones that fit based on the given predicate functions
// Each node is passed through the predicate functions to determine if it is a fit
func findNodesThatFit(


Por cada nodo se hace:
fits, failedPredicates, err := podFitsOnNode(pod, meta, nodeNameToInfo[nodeName], predicateFuncs)

Se van generando tres listas:
 1.- con los errores (err de la función anterior)
 2.- "filtered" con los nodos validos
 3.- "failedPredicateMap[nodeName]" con los errores mapeados a un nodo en concreto

Para el mensaje de ejemplo es un error FitError, por lo que ninguna de las llamadas a podFitsOnNode tuvo que devolver ningún error.
Para sacar ese error la lista de filteredNodes tenia que tener len=0
Por lo que nos queda que el error nos esta devolviendo el mapa de failedPredicateMap
failedPredicateMap[nodeName] = failedPredicates

El error de "fit failure summary on nodes" lo que nos devuelve es el número de razones encontradas para cada tipo de razon.
"CheckServiceAffinity (5), MatchNodeSelector (5)" quiere decir que hubo 5 nodos que fallaron devolviendo los predicados "CheckServiceAffinity" y "MatchNodeSelector"


Para saber si un nodo es adecuado se llama a cada una de las funciones predicateFuncs pasadas a findNodesThatFit (esos predicados estan almacenados en el genericScheduler)
Si todos los predicates dan fit a true, se da por valido el nodo.


Trazando de donde vienen los predicates:

Los predicates se definen al generar el scheduler: func NewGenericScheduler(
https://github.com/kubernetes/kubernetes/blob/v1.5.7/plugin/pkg/scheduler/generic_scheduler.go#L395

La creación el scheduler se hace en
https://github.com/kubernetes/kubernetes/blob/v1.5.7/plugin/pkg/scheduler/factory/factory.go#L373
predicateFuncs, err := f.GetPredicates(predicateKeys)


// Creates a scheduler from the configuration file
func (f *ConfigFactory) CreateFromConfig(policy schedulerapi.Policy) (*scheduler.Config, error) {
...
  for _, predicate := range policy.Predicates {
      glog.V(2).Infof("Registering predicate: %s", predicate.Name)
      predicateKeys.Insert(RegisterCustomFitPredicate(predicate))
  }

Podemos ver los predicates que se han configurado mirando el log de arranque de openshift:
journalctl -u atomic-openshift-master-controllers.service | grep -i "Registering predicate"

Tambien los tenemos en /etc/origin/master/scheduler.json en "predicates"

Un ejemplo de un despliegue real:
NoVolumeZoneConflict MaxEBSVolumeCount MaxGCEPDVolumeCount MatchInterPodAffinity NoDiskConflict GeneralPredicates PodToleratesNodeTaints CheckNodeMemoryPressure CheckNodeDiskPressure Region


GeneralPredicates contiene (nombre bonito usado en la config):
 PodFitsResources (PodFitsResources)
 PodFitsHost (HostName)
 PodFitsHostPorts (PodFitsHostPorts)
 PodSelectorMatches (MatchNodeSelector)

El mapeo entre el nombre "bonito" (usado en la config .json) y las funciones se hace en plugin/pkg/scheduler/algorithmprovider/defaults/defaults.go

El nombre sacado en caso de error es el definido en plugin/pkg/scheduler/algorithm/predicates/error.go

Que hace cada predicate esta definido en https://github.com/kubernetes/kubernetes/blob/v1.5.7/plugin/pkg/scheduler/algorithm/predicates/predicates.go


CheckServiceAffinity, checkServiceAffinity()
https://github.com/kubernetes/kubernetes/blob/v1.5.7/plugin/pkg/scheduler/algorithm/predicates/predicates.go#L712
En el comentario viene explicado que hace
En caso de que no pase, devolverá el error CheckServiceAffinity

MatchNodeSelector, PodSelectorMatches()
https://github.com/kubernetes/kubernetes/blob/v1.5.7/plugin/pkg/scheduler/algorithm/predicates/predicates.go#L554
Por cada nodo se revisa una serie de parametros para ver si puede correr en este nodo.
Se comprueban las labels y la affinity. En caso de que alguno no pase se devolverá el error MatchNodeSelector.
Se mira el Spec del pod tiene NodeSelector. Si tiene uno o varios, se matchea contra las labels del nodo. Si no, se sigue con la comprobación de las afinidades.


TODO:
 el PodSelectorMatches hace check de afinidad tambien. Es lo mismo que hace el CheckServiceAffinity??
 porque fallan esos dos? que no le gusta de mi pod para que no lo deje correr?
 porque da 5? no deberian ser 6? (3 apps + 3 infra)

fit failure summary on nodes : CheckServiceAffinity (5), MatchNodeSelector (5); retrying
