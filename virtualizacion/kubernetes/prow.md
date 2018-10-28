https://github.com/kubernetes/test-infra/tree/master/prow
https://github.com/kubernetes/test-infra/blob/master/prow/architecture.md

Receptor de webhooks externos para lanzar acciones en Kubernetes.

El webhook llega prow.
Este se lo pasa a los plugins que tenga configurados.
Llega al plugin trigger que genera un custom resource (ProwJob)

Cada 30", plan ejecuta una función que lista los ProwJobs y crea pods para las jobs que no tengan asignado ninguno.

Ejemplo de como lo usa la gente de Jenkins X: https://github.com/jenkins-x/prow-config
