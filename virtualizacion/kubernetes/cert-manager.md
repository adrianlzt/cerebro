https://cert-manager.io/docs

# Kubectl plugin
kubectl krew install cert-manager

Uso: https://cert-manager.io/docs/usage/cmctl/#approve-and-deny-certificaterequests


# Verificación
https://github.com/alenkacz/cert-manager-verifier

Verificar si cert-manager está instalado correctamente.



# Configuración
Tras instalar cert-manager tenemos que configurar al menos un Issuer para que nos de certificados.

## Let's Encrypt
Crear un issuer usando letsencrypt-staging para hacer pruebas.
```
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-staging
spec:
  acme:
    # You must replace this email address with your own.
    # Let's Encrypt will use this to contact you about expiring
    # certificates, and issues related to your account.
    email: user@example.com
    server: https://acme-staging-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      # Secret resource that will be used to store the account's private key.
      name: example-issuer-account-key
    # Add a single challenge solver, HTTP01 using nginx
    solvers:
    - http01:
        ingress:
          class: nginx
```

Configuirar el ingress que estemos usando y cambiar el email

Este es un issuer que vale para todo el cluster, si queremos solo para un namespace en concreto creamos un "Issuer".



# Generar certificados

## Generar un certificado a mano
https://cert-manager.io/docs/usage/certificate/#creating-certificate-resources

Podemos usar el CRD "Certificate" para generar un CSR.

Se usará el campo certificate.spec.issuerRef para decir que issuer queremos que firme ese certificado.

Ejemplo básico:
```
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: t2-test-com
  namespace: default
spec:
  secretName: t2-test-com-tls
  dnsNames:
    - t2.test.com
  issuerRef:
    name: letsencrypt-staging
    kind: ClusterIssuer
```
Para saber cuando está listo consultaremos su estado:
kubectl get certificate t2-test-com

Cuando esté listo (Ready=True), tendremos el certificado en secrets/t2-test-com-tls

Si borramos el CRD Certificate, no se borrará el secret.


## Ingress
Tendremos que crear un ingress con spec.tls y una annotation determinada:
```
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: my-ingress
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-staging
spec:
  ingressClassName: nginx-public
  rules:
    - host: example.com
      http:
        paths:
          - path: /
            backend:
              serviceName: my-service
              servicePort: 80
  tls:
    - hosts:
      - example.com
```
