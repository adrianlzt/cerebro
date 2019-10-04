https://github.com/kubernetes-sigs/kustomize
https://github.com/kubernetes-sigs/kustomize/blob/master/docs/README.md

Es una forma de componer y modificar ficheros YAML.
La idea es tener una base de YAML y luego otros que hagan pequeñas modificaciones (por ejemplo, por entorno).
También nos permite crear secrets fácilemente en el YAML.

Lo usaremos con:
kubectl apply -k directorio/

En el directorio tendremos un fichero
kustomization.yaml


# Images
images:
  - name: postgres
    newName: my-registry/my-postgres
    newTag: v1

Busca un pod que tiene un container "postgres" y le cambiar la imagen y el tag de la imagen.

Otra forma para especificar exactamente lo que queremos modificar, por ejemplo un image de un CRD
https://github.com/kubernetes-sigs/kustomize/tree/master/examples/transformerconfigs/images


# Secrets
https://github.com/kubernetes-sigs/kustomize/blob/master/examples/secretGeneratorPlugin.md
https://kubernetes.io/docs/concepts/configuration/secret/#creating-a-secret-from-generator
Generar a partir de Kustomize

Se pueden también crear a partir de un plugin custom (escrito en go) que por ejemplo los obtenga de algún lugar seguro.

cat <<EOF >./kustomization.yaml
secretGenerator:
- name: mysecrets
  envs:
  - foo.env
  files:
  - longsecret.txt
  literals:
  - FRUIT=apple
  - VEGETABLE=carrot
EOF

kubectl apply -k .
secret/db-user-pass-96mffmfh4k created

foo.env
ROUTER_PASSWORD=admin
DB_PASSWORD=iloveyou
