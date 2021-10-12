https://github.com/GoogleCloudPlatform/terraformer

Generar ficheros .tf a partir de despliegues ya realizados en infraestructura.

Mirar que versión de terraform necesita (parece que van con algunas de retraso)
https://github.com/GoogleCloudPlatform/terraformer#capabilities

Importar ciertos recursos de un projecto en google
terraformer import google --projects NOMBREPROYECTO --resources addresses,backendBuckets,backendServices,forwardingRules,gcs,globalAddresses,healthChecks,httpHealthChecks,httpsHealthChecks,iam,images,instanceGroupManagers,instanceGroups,instances,networkEndpointGroups,networks,nodeGroups,sslCertificates,sslPolicies,subnetworks,targetHttpProxies,targetHttpsProxies,targetInstances,targetPools,targetSslProxies,targetTcpProxies

Generará los ficheros en:
generated/google/NOMBREPROYECTO/TIPO_RECURSO/ZONA?/
  compute_backend_service.tf
  outputs.tf
  provider.tf
  terraform.tfstate
  variables.tf


Para saber que resources se soportan, por ejemplo en GCP: https://github.com/GoogleCloudPlatform/terraformer/blob/master/docs/gcp.md
