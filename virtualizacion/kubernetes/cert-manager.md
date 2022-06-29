https://cert-manager.io/docs

# Kubectl plugin
kubectl krew install cert-manager


# Verificación
https://github.com/alenkacz/cert-manager-verifier

Verificar si cert-manager está instalado correctamente.


# Configuración
Tras instalar cert-manager tenemos que configurar al menos un Issuer para que nos de certificados.

## Let's Encrypt
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
