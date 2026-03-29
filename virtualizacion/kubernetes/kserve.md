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


## LLMInferenceService

Específicamente diseñado para los LLMs y sus particularidades.

Orchestrates a much more sophisticated network of resources specifically for high-concurrency token streaming. It provisions an InferencePool, an InferenceModel, an internal Scheduler Deployment (Endpoint Picker Pod), an API Gateway, and an HTTPRoute.

## ClusterServingRuntimes

ServingRuntimes declarados a nivel de cluster.

Un ServingRuntimes sería para un namespace determinado.
