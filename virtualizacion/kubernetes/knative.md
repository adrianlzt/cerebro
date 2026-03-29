Kubernetes-based platform that provides a complete set of middleware components for building, deploying, and managing modern serverless workloads. Knative extends Kubernetes to provide higher-level abstractions that simplify the development and operation of cloud-native applications.

Abstracciones más simples para desplegar.

Scale to 0 si no se usa, levantar cuando sea necesario.

Event-driven architecture.

Knative-functions, parece lo de FaaS (function as a service).

Parece que ofrece lo que dan ciertos providers cloud, pero sin el lock-in.

# kubectl

Obtener todos los recursos de kserve:
```bash
kc get crd -o json | jq -r '.items[] | select(.metadata.name | contains("knative.dev")) | .spec.names.shortNames[0]' | xargs -I {} sh -c 'echo "--- Resources for {} (all namespaces) ---"; kc get {} --all-namespaces'
```
