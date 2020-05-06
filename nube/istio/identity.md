https://istio.io/blog/2019/app-identity-and-access-adapter/


Ejemplo de como podríamos tener authentication para una SPA (single page applications) y unas APIs.
Desplegamos el servidor Hydra.
Creamos un client en Hydra (client_id + client_secret)
Exponemos una app que hace el login/consent/logout. Tendrá una db de usuarios y se debe comunicar con hydra.
Desplegamos nuetros servicios en k8s/istio, protegiéndolos con RequestAuthentication, pasando upstream el x-jwt-payload.
Las APIs solo tienen que ver si tienen esa cabecera (entonces es un usuario logueado) y obtener la info del usuario del base64(json) de esa cabecera.




# Identify server / ORY Hydra
Desplegar hydra como servidor de identity



# Gestores Istio <-> OIDC
Nos permite securizar nuestras apps web y APIs

Parece que el nombre para este tipo de aplicaciones que se ponen delante para comprobar authentication es Auth API Gateway.


## Limitar acceso via JWT
https://istio.io/docs/tasks/security/authentication/authn-policy/#end-user-authentication

Istio nos permite bloquear el acceso a ciertos services (la doc lo hace en el ingressgateway, pero entiendo que vale en cualquier service) si no tienen un token JWT válido.
Se puede especificar que acción realizar por path.
El cliente debe pasarnos en las headers de la request el "Authorization: Bearer $TOKEN" si quiere lograr acceso.

Ejemplo que limita el acceso a los pods que cumplan label app=httpbin.
No se permite el acceso a /anything/secure sin un token JWT válido.

apiVersion: "security.istio.io/v1beta1"
kind: "RequestAuthentication"
metadata:
  name: "jwt-example"
spec:
  selector:
    matchLabels:
      app: httpbin
  jwtRules:
  - issuer: "https://hydra-public.domain/"
    jwksUri: "https://hydra-public.domain/.well-known/jwks.json"
    forwardOriginalToken: true  # Esta opción pasa el Authorization header al upstream
    outputPayloadToHeader: x-jwt-payload  # Esta opción pasa el payload del jwt en base64 en el header que aquí pongamos (el json que contiene el user y el resto de info). Envoy evita que alguien pueda inyectar esa header a mano. Si llega, no la pasa upstream.
---
apiVersion: "security.istio.io/v1beta1"
kind: "AuthorizationPolicy"
metadata:
  name: "frontend-ingress"
spec:
  selector:
    matchLabels:
      app: httpbin
  action: DENY
  rules:
  - from:
    - source:
        notRequestPrincipals: ["*"]
    to:
    - operation:
        paths: ["/anything/secure"]



Las reglas jwtRules son convertidas a reglas de envoy
https://github.com/istio/istio/blob/f56ef77cdeda173e971841ebb2e3fb90d4ed6fd5/pilot/pkg/security/authn/v1beta1/policy_applier.go#L208

Config de envoy que se usa:
https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/jwt_authn_filter#config-http-filters-jwt-authn





## Authservice
https://github.com/istio-ecosystem/authservice

Necesitamos OIDC provider configured to support Authorization Code grant type

Parece bastante manual, teniendo que inyectar un sidecar en cada pod que queremos proteger.
Se inyecta un filtro a envoy para que las peticiones pasen primero por este sidecar de authservice, que decidirá (según si la petición está logueada) si nos reenvia a la web de login.
La sesión la almacena ese propio container, por lo que todas las peticiones de un mismo user deben enviarse al mismo pod (se mete una session cookie a nivel de istio)

Ejemplo de despliegue con la app bookinfo (cuidado que algunos archivos tienen puesto el namespace a default):
https://github.com/istio-ecosystem/authservice/tree/master/bookinfo-example

Sugieren también que puedes modificar el ingressgateway y meter ahí el authservice, para aplicarlo sobre todos los pods que estén por debajo de ese gateway
https://github.com/istio-ecosystem/authservice/tree/master/bookinfo-example#istio-ingress-gateway-integration

También parece que se puede hacer authorization:
https://github.com/istio-ecosystem/authservice/tree/master/bookinfo-example#deploy-bookinfo-using-the-authservice-for-token-acquisition--authorization-sidecar-integration


### Config
Crear un ConfigMap con los endpoints del OIDC
Usar este como template:
https://github.com/istio-ecosystem/authservice/blob/master/bookinfo-example/config/authservice-configmap-template-for-authn.yaml

Debemos setear:
  authorization_uri: obtener del OIDC .well-known/openid-configuration
  token_uri: obtener del OIDC .well-known/openid-configuration
  jwks: el contenido de la url jwks_uri (.well-known/jwks.json)
  callback_uri: págian de nuestra app que recibirá el callback (obligatoriamente https)
  client_id: cuenta creada en el OIDC
  client_secret: cuenta creada en el OIDC
  logout.redirect_uri: nuestra app?


Para desplegar las imágenes de docker hay que hacer un apaño, porque las imágenes las tienen en el registry de github, pero no está soportado por containerd
https://github.com/containerd/containerd/issues/3291

Pusheada a adrianlzt/authservice:0.3.1-d3cd2d498169 en docker hub


### Deploy
Ahora desplegaremos nuestra app, poniendo como sidecar a los pods que queamos proteger el container de authservice

Ejemplo, protegiendo el pod productpage
https://github.com/istio-ecosystem/authservice/blob/master/bookinfo-example/config/bookinfo-with-authservice-template.yaml

Recordad que debe estar activo el injection de istio.


### Acceso
Crearemos el Gateway y VirtualService para poder acceder a la app desplegada

Ejemplo: https://github.com/istio-ecosystem/authservice/blob/master/bookinfo-example/config/bookinfo-gateway.yaml

Testear que accedemos sin problemas a URL/productpage


### Policy
Ahora vamos a poner las policies de acceso:
https://raw.githubusercontent.com/istio-ecosystem/authservice/master/bookinfo-example/config/bookinfo-authn-policy-template.yaml

Parece que en las nuevas versiones esto se ha movido a:
apiVersion: "security.istio.io/v1beta1"
kind: "RequestAuthentication"

Tenemos que definir el jwksUri (lo obtenemos del OIDC .well-known/openid-configuration) y el issuer (también está en el openid-configuration)

Esperar como 1' para que se aplique la policy.
Luego entrar en URL/productpage
Tendremos un 401, porque Istio está protegiendo ese service con el policy.authentication.istio.io que hemos creado


### EnvoyFilter
Ahora vamos a inyectar el filtro a envoy para capturar las peticiones, y las que no estén logueadas, enviarlas a la web de login.

https://raw.githubusercontent.com/istio-ecosystem/authservice/master/bookinfo-example/config/productpage-external-authz-envoyfilter-sidecar.yaml

Esperar 1' y volver a probar a acceder a URL/productpage

Mirando el log del pod de envoy parece que algo no funciona:

Chequear el container istio-proxy por algún mensaje de que ha ido bien o mal la inserción de este filter (me sale uno, pero funciona).
En la config de envoy deberemos encontrar un cluster con name "ext_authz", con el socket_address 127.0.0.1 10003

Una vez se produzca todo el auth, a la app se le pasará un header "authorization" con "Bearer TOKEN_KWT"
Si la app lee ese token JWT podrá obtener el username sabiendo que está autenticado.

El navegador se estará quedando con una cookie y el sidecar authserver será el que esté cogiendo esa cookie y convirtiéndola en el header authorization.




## App identity and access adapter
https://istio.io/blog/2019/app-identity-and-access-adapter/
https://www.ibm.com/cloud/blog/using-istio-to-secure-your-multicloud-kubernetes-applications-with-zero-code-change
Usar App Identity and Access Adaptar para controlar authentication y authorization para los usuarios.

Parece más k8s-native a la hora de configurarlo, pero creo que usa una pieza central que tal vez sea un SPOF.
Como la implementación actual está deprecated habrá que ver como evoluciona para las nuevas versiones.
Parece que un problema es donde se almacena la info se sesión, en authservice la almacena, en memoria, cada sidecar.


Tenemos que tener activado en Istio el Policy Enforcement (que pone que está deprecated en la 1.5!)
  Dicen que será soportado hasta la 1.7 y que para entonces se habrán adaptado al nuevo formato.
  https://github.com/ibm-cloud-security/app-identity-and-access-adapter/issues/59
Chequear en que estado está (si pone false ya está como lo necesitamos):
kubectl -n istio-system get cm istio -o jsonpath="{@.data.mesh}" | grep disablePolicyChecks

Cambiar el estado:
istioctl manifest apply --set values.global.disablePolicyChecks=false --set values.pilot.policy.enabled=true

Al lanzar el comando me dice:
Detected that your cluster does not support third party JWT authentication. Falling back to less secure first party JWT. See https://istio.io/docs/ops/best-practices/security/#configure-third-party-service-account-tokens for details.
Y luego me sigue diciendo disablePolicyChecks: True
Lo dejo aqui para mirar authservice



Desplegar con helm en el NS istio-system

helm repo add appidentityandaccessadapter https://raw.githubusercontent.com/ibm-cloud-security/app-identity-and-access-adapter/master/helm/appidentityandaccessadapter
helm install appidentityandaccessadapter appidentityandaccessadapter/appidentityandaccessadapter


Crear config de un openid server:
---
apiVersion: "security.cloud.ibm.com/v1"
kind: OidcConfig
metadata:
    name: hydra-provider-config
spec:
    discoveryUrl: https://hydra-public.domain/.well-known/openid-configuration
    clientId: istio-ibm
    clientSecret: secret123
    #clientSecretRef:
    #    name: hydra-ibm-client
    #    key: secret

Chequear logs del pod dpl-appidentityandaccessadapter en el ns istio-system para comprobar que ha ido bien.
Synced public keys
Synced JWKs successfully
OidcConfig created/updated



Poner una policy para /web/home en el service svc-sample-app:
---
apiVersion: "security.cloud.ibm.com/v1"
kind: Policy
metadata:
    name: sampleapp-backend-policy
spec:
    targets:
    - serviceName: svc-sample-app
      paths:
      - exact: /web/home
        method: ALL
        policies:
        - policyType: oidc
          config: hydra-provider-config

