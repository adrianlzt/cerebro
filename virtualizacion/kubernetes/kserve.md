https://kserve.github.io/

Una forma sencilla de deslegar modelos de IA en kubernetes.

Defines un modelo, como ejecutarlo, sus requisitos, etc.

Kserve se encarga de disponibilizarlo. Por debajo hace uso de Knative.

Lo que nos aporta kserve: autoscaling, load balancing, canary deployments, and GPU acceleration out of the box

Kserve es capaz de correr modelos de diferentes tipos: sklearn, tensorflow, pytorch, huggingface, etc

# Arquitectura

Declaramos un InferenceService/LLMInferenceService que se ejecuta sobre un ClusterServingRuntimes/ServingRuntimes.

ClusterStorageContainers usado para gestionar el acceso a donde estén almacenados los modelos.


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
