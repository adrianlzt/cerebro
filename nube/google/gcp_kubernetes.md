# Registry
Tenemos disponibe un registry (grc.io).
Por defecto k8s podrá acceder a las imágenes del registry de su mismo proyecto.
https://cloud.google.com/container-registry/docs/using-with-google-cloud-platform

https://cloud.google.com/container-registry/docs/using-with-google-cloud-platform
Tenemos que conceder permiso de lectura al registry (Artifact Registry Reader) a la cuenta "Compute Engine default service account" (xxx-compute@developer.gserviceaccount.com) del otro proyecto.

También le he concedido: Storage Object Viewer
No se cual de los dos es el necesario.
