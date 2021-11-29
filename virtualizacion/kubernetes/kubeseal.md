https://github.com/bitnami-labs/sealed-secrets

Encrypt your Secret into a SealedSecret, which is safe to store - even to a public repository. The SealedSecret can be decrypted only by the controller running in the target cluster and nobody else (not even the original author) is able to obtain the original Secret from the SealedSecret.

# Uso
Obtener el cert para encriptar los secrets (public key):
kubeseal --fetch-cert --controller-name sealed-secrets > sealed-secrets.crt


Encriptar un fichero (un fichero que contenga Secret de k8s)
```
kubeseal --format yaml --cert sealed-secrets.crt </tmp/admin-credentials.yml> sealed-admin-credentials.yml
```


Obtener la clave privada para desencriptar secrets:
```
kubectl get secret -n kube-system -l sealedsecrets.bitnami.com/sealed-secrets-key -o yaml > sealed-secrets.key
```

Unseal (decrypt) a sealed-secret.
```
kubeseal --recovery-unseal --recovery-private-key sealed-secrets.key < sealed-admin-credentials.yml
```
