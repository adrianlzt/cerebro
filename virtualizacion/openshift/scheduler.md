# Analisis de como openshift 3.5 / kubernetes 1.5 selecciona un nodo para un pod

Aqui se llama a la funcion que debera encontrar un nodo para el pod
https://github.com/kubernetes/kubernetes/blob/v1.5.7/plugin/pkg/scheduler/generic_scheduler.go#L118
  filteredNodes, failedPredicateMap, err := findNodesThatFit(pod, g.cachedNodeInfoMap, nodes, g.predicates, g.extenders, g.predicateMetaProducer)


En caso de no encontrar ningun nodo (len(filteredNodes) == 0) se generará un error:
"pod (%s) failed to fit in any node\n"

Ejemplo real del error:
E0905 14:14:40.852773  110572 factory.go:583] Error scheduling dsmc-monitoring prueba-1-deploy: pod (prueba-1-deploy) failed to fit in any node
fit failure summary on nodes : CheckServiceAffinity (5), MatchNodeSelector (5); retrying

