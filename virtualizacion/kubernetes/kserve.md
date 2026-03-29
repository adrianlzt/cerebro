https://kserve.github.io/

Una forma sencilla de deslegar modelos de IA en kubernetes.

Defines un modelo, como ejecutarlo, sus requisitos, etc.

Kserve se encarga de disponibilizarlo. Por debajo hace uso de Knative.

Lo que nos aporta kserve (InferenceService):
 - Automatic deployment creation and reconciliation
 - Request-based autoscaling with scale-to-zero and autoscaling based on custom metrics
 - Revision management and canary rollouts
 - Endpoint exposure and traffic routing
 - Runtime abstraction across serving backends for both predictive and generative AI
 - Optional pre-processing/post-processing, inference pipelines, and ensembles

Kserve es capaz de correr modelos de diferentes tipos: sklearn, tensorflow, pytorch, huggingface, etc

# Arquitectura

Declaramos un InferenceService/LLMInferenceService que se ejecuta sobre un ClusterServingRuntimes/ServingRuntimes.

ClusterStorageContainers usado para gestionar el acceso a donde estén almacenados los modelos.

## llm-d
https://llm-d.ai/
https://kserve.github.io/website/blog/cloud-native-ai-inference-kserve-llm-d

Hace de enrutador inteligente, puesto antes de vLLM (cache-aware, enrutar según que estemos haciendo, prefill decode).

Enruta las peticiones a distintas GPUs según la petición.


## Flujo de red

Al desplegar una inferencia, Kserve crea un "service" de Knative (ksvc / Service.serving.knative.dev)


# CRDs

## InferenceService

Para modelos ML genéricos.

Typically translates your definition into a standard Kubernetes Deployment (or Knative Service for serverless scale-to-zero) and a basic Service.

Ejemplo básico, donde básicamente específicamos donde descargar el modelo y su formato:
```yaml
apiVersion: "serving.kserve.io/v1beta1"
kind: "InferenceService"
metadata:
  name: "sklearn-iris"
  namespace: kserve-test
spec:
  predictor:
    model:
      modelFormat:
        name: sklearn
      storageUri: "gs://kfserving-examples/models/sklearn/1.0/model"
      resources:
        requests:
          cpu: "100m"
          memory: "512Mi"
        limits:
          cpu: "1"
          memory: "1Gi
```

Cuando desplegamos uno de estos, Kserve inyectará un init container, "storage-initializer", que se encargará de descargar el modelo y dejarlo en /mnt/models (esto será un PVS o un empty-dir).

Luego tendremos dos containers principales:

kserve-container: realiza la inferencia. También tiene montado /mnt/models

queue-proxy:


## LLMInferenceService

Específicamente diseñado para los LLMs y sus particularidades.

Orchestrates a much more sophisticated network of resources specifically for high-concurrency token streaming. It provisions an InferencePool, an InferenceModel, an internal Scheduler Deployment (Endpoint Picker Pod), an API Gateway, and an HTTPRoute.

 - Long-running streaming responses
 - GPU-heavy memory footprints
 - Prefix KV-cache management
 - High-concurrency token streaming
 - OpenAI-compatible APIs

Hace uso de distintos LLMInferenceServiceConfigs para definir como realizar estos despliegues más complejos.

Los LLMInferenceService

## ClusterServingRuntimes

ServingRuntimes declarados a nivel de cluster.

Un ServingRuntimes sería para un namespace determinado.

## InferenceGraph

Enrutar peticiones a distintos InferenceServices según unas reglas.

## TrainedModels

This is used for "ModelMesh," a high-density deployment pattern where a single runtime pod serves hundreds or thousands of lightweight models simultaneously to save compute resources.

Relationship: You would deploy one large InferenceService acting as an empty shell, and then dynamically load multiple TrainedModels into it without restarting the pod.

## ClusterStorageContainers

Podemos declarar como acceder a nuestros modelos.

Por ejemplo, que para acceder a tal bucket de s3 se usan tales credenciales.

# kubectl

## Obtener todos los recursos de kserve

```bash
kc get crd -o json | jq -r '.items[] | select(.metadata.name | contains("kserve.io")) | .spec.names.plural' | xargs -I {} sh -c 'echo "--- Resources for {} (all namespaces) ---"; kc get {} --all-namespaces'
```

## Obtener los recursos de los nodos y su ocupación

```bash
❯ kubectl get node -o json | llm jq "get Allocatable and Allocated resources, with the node name"
{
  "nodeName": "kservepro01",
  "allocatable": {
    "cpu": "31400m",
    "ephemeral-storage": "424729679577",
    "hugepages-1Gi": "0",
    "hugepages-2Mi": "0",
    "memory": "130119936Ki",
    "nvidia.com/gpu": "2",
    "pods": "110"
  },
  "capacity": {
    "cpu": "32",
    "ephemeral-storage": "461998976Ki",
    "hugepages-1Gi": "0",
    "hugepages-2Mi": "0",
    "memory": "131008768Ki",
    "nvidia.com/gpu": "2",
    "pods": "110"
  }
}
```

Ver que pods usan GPUs (requests y limits):
```bash
kubectl get pods -n kserve-test -o go-template='{{range .items}}{{$pod := .metadata.name}}{{$hasGPU := false}}{{range .spec.containers}}{{with .resources}}{{if index .requests "nvidia.com/gpu"}}{{$hasGPU = true}}{{end}}{{end}}{{end}}{{if $hasGPU}}{{$pod}}{{range .spec.containers}}{{with .resources}}{{if index .requests "nvidia.com/gpu"}} [REQ:{{index .requests "nvidia.com/gpu"}} LIM:{{index .limits "nvidia.com/gpu"}}]{{end}}{{end}}{{end}}{{"\n"}}{{end}}{{end}}'
```

Ver que tarjeta usa cada pod y en que host están (usa 'exec' y `nvidia-smi`):
```bash
kubectl get pods -A -o json | jq -r '.items[] | select(.spec.containers[].resources.requests["nvidia.com/gpu"]) | "\(.metadata.namespace)/\(.metadata.name) \(.spec.nodeName) " + (.spec.containers[] | select(.resources.requests["nvidia.com/gpu"]) | .name)' | while read -r pod node container; do ns=$(echo $pod | cut -d/ -f1); name=$(echo $pod | cut -d/ -f2); echo "=== $pod (node: $node, container: $container) ==="; kubectl exec -n "$ns" "$name" -c "$container" -- nvidia-smi --query-gpu=name,memory.total --format=csv; echo; done
```
