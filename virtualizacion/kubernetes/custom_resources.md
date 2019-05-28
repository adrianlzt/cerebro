https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/

Nos permiten almacenar datos en el cluster de kubernetes.
Lo usaremos típicamente con un controller que estará escuchando cambios en ese "resource" (un "pod" o un "service" son resources) y actuará.

Podemos integrarnos creando CRDs (Custom Resource Definition). Simple y sin programación. https://kubernetes.io/docs/tasks/access-kubernetes-api/custom-resources/custom-resource-definitions/
O con API aggregation (requiere programación).

Hay casos que tendrá más sentido usar ConfigMaps (en la web explica cuando usar cada uno).


Listar todos los resources:
kubectl api-resources



# CRD
Ejemplo creando un CRD y un controller para ese tipo de recursos:
https://github.com/kubernetes/sample-controller

Listar CRDs (es global, no por namespace)
kubectl get crd

Para ver la descripción completa del CRD
kubectl describe crd environments.jenkins.io
  en este caso:
    Scope: Namespaced
    ...
    Accepted Names:
      ...
      Short Names:
        env
      Singular:  environment

Como es "namespaced" (que los recursos pertenecen a los namespaces en vez de a todo el cluster), podemos solicitar todos los objectos de este CRD con:
kubectl get env --all-namespaces


Parece que la nomenclatura para llamar a los CRD que se suele seguir es, ejemplo:
users.elasticsearch.k8s.elastic.co

Al hacer:
kubectl get users
Si solo hay un CRD que matchea esa expresion "users", nos mostrará ese de elasticsearch.
Si no, tendremos que especificar más.
