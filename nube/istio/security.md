https://istio.io/docs/concepts/security/
https://istio.io/pt-br/docs/tasks/security/citadel-config/

https://istio.io/docs/concepts/security/#authorization
control who can access your services.

Manages authentication, authorization, and encryption of service communication
Se integra con las network policies de k8s
Lo implementa Citadel


# Service account tokens / JWT (jeson web tokens)
https://istio.io/docs/ops/best-practices/security/#configure-third-party-service-account-tokens
El proxy usa service account tokens para hablar con el control plane.
Lo ideal es tener un "third party" que gestione estos tokens, que caducan y tienen un scope definido.
El kubelet es el encargado de montarlo en los pods e ir refrescándolos.

Los cloud providers parece que suelen llevar uno ya configurado.

En los k8s on premises no viene por defecto.
En estos casos Istio usará "first party tokens", que no caducan y se montan en todos los pods (menos seguro)



# Authentication
"Saber quien es alguien"
https://istio.io/docs/concepts/security/#authentication

Dos tipos:
 - peer auth: para asegurarnos la comunicación lícita entre services
 - request auth: para verificar los end-users. Debemos implementar un proveedor de auth, custom o alguno que soporte OpenID, por ejemplo:
   - ORY Hydra (en go, cloud native, parece una buena opción)
   - Keycloak (java, redhat, parece orientado a servers java, tomcat, jboss, etc)
   - Auth0 (servicio de pago)
   - Firebase Auth (creo que este es para usarlo en GCP)
   - Google Auth (para usar la cuenta de google como login)




# Authorization
"Decidir si se concede acceso a alguien"
https://istio.io/docs/concepts/security/#authorization

Podemos crear reglas para decidir que workload o user puede hablar con tal workload.

Policies: https://istio.io/docs/reference/config/security/authorization-policy/


Ejemplo de como limitar el acceso a distintos services, denegando por defecto el tráfico y solo permitiendo ciertas llamadas entre ciertos workloads
https://istio.io/docs/tasks/security/authorization/authz-http/


Este creo que sería un ejemplo similar a como integraríamos el auth con Hydra
https://istio.io/docs/tasks/security/authorization/authz-jwt/
