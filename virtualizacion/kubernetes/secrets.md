# Ver un secret
https://github.com/elsesiy/kubectl-view-secret
kubectl krew install view-secret
kubectl view-secret <secret> <key>
kubeclt view-secret <secret> -a/--all


kubectl create secret generic my-secret --from-literal=key1=supersecret

# https://kubernetes.io/docs/concepts/configuration/secret/
#
apiVersion: v1
kind: Secret
metadata:
  name: mysecret
type: Opaque
data:
  password: $(echo -n "s33msi4" | base64 -w0)
  username: $(echo -n "jane" | base64 -w0)


Usando un secret como variable de entorno:
  env:
  - name: REDMINE_DB_PASSWORD
    valueFrom:
      secretKeyRef:
        name: mysecret
        key: password


Crear a partir de ficheros/directorios (cogerá todos los ficheros del dir) :
kubectl create secret generic db-user-pass --from-file=./username.txt --from-file=./password.txt

Tendremos el secret "db-user-pass" con los data "username.txt" y "password.txt"

Copiar un secret de namespace
kubectl get secret gitlab-registry --namespace=revsys-com --export -o yaml | kubectl apply --namespace=devspectrum-dev -f -


# Cert TLS
kc create secret tls NOMNRE --cert certs/cert.pem --key certs/cert.key



# Secret como fichero
    spec
      containers:
      - name: sample-app
        image: gcr.io/google_containers/defaultbackend:1.0
        ports:
        - containerPort: 8080
        volumeMounts:
        - name: service-key
          mountPath: /root/key.json
          subPath: key.json
      volumes:
      - name: service-key
        secret:
          secretName: my-secret
          items:
          - key: service-account-key
            path: key.json


# Kustomize
https://kubernetes.io/docs/concepts/configuration/secret/#creating-a-secret-from-generator
Generar a partir de Kustomize

cat <<EOF >./kustomization.yaml
secretGenerator:
- name: db-user-pass
  files:
  - username.txt
  - password.txt
EOF

kubectl apply -k .
secret/db-user-pass-96mffmfh4k created


secretGenerator:
- name: db-user-pass
  literals:
  - username=admin
  - password=secret
