https://github.com/kubernetes-sigs/kustomize
https://github.com/kubernetes-sigs/kustomize/blob/master/docs/README.md

Es una forma de componer y modificar ficheros YAML.
La idea es tener una base de YAML y luego otros que hagan pequeñas modificaciones (por ejemplo, por entorno).
También nos permite crear secrets fácilmente en el YAML.

Lo usaremos con:
kubectl apply -k directorio/

O podemos generar el yaml final con:
kustomize build dir/


En el directorio tendremos un fichero
kustomization.yaml


# Transformers
https://github.com/kubernetes-sigs/kustomize/blob/master/docs/fields.md#transformers
Para modificar los yaml base de alguna manera

## Images
images:
  - name: postgres
    newName: my-registry/my-postgres
    newTag: v1

Busca un pod que tiene un container "postgres" y le cambiar la imagen y el tag de la imagen.

Otra forma para especificar exactamente lo que queremos modificar, por ejemplo un image de un CRD
https://github.com/kubernetes-sigs/kustomize/tree/master/examples/transformerconfigs/images

## Patches
https://github.com/kubernetes-sigs/kustomize/blob/master/examples/inlinePatch.md

Formas de modificar los yaml base.
Hay 3: patches, patchesJson6902 y strategicMerge

### patchesJSON6902
patchesJSON6902:
- target:
    group: apps
    version: v1
    kind: Deployment
    name: deploy
    namespace: nombre # opcional
  patch: |-
    - op: replace
      path: /spec/template/spec/containers/0/image
      value: nginx:latest

Si en el path tenemos que usar el caracter "~" o "/" los pondremos como "~0" o "~1"
https://stackoverflow.com/a/54820201
Ejemplo:
  path: /metadata/annotations/kubernetes.io~1ingress.class


### strategicMerge
Un parche que modifica algún campo de uno de los yaml base
No funciona si el yaml base tiene "namespace" configurado.

patchesStrategicMerge:
- |-
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: nginx
  spec:
    template:
      spec:
        containers:
          - name: nginx
            image: nignx:latest



# Generators
https://github.com/kubernetes-sigs/kustomize/blob/master/docs/fields.md#generators


## Secrets
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
  - nombreSecret.txt=nombreFicheroReal.txt
  literals:
  - FRUIT=apple
  - VEGETABLE=carrot
EOF

kubectl apply -k .
secret/db-user-pass-96mffmfh4k created

foo.env
ROUTER_PASSWORD=admin
DB_PASSWORD=iloveyou


Teóricamente kustomize modifica los recursos que usen los secrets para ponerle el hash que se le añade a los nombres.
Resources such as PodTemplates should reference Secrets by the name secretsGenerator field, and Kustomize will update the reference to match the generated name, as well as namePrefix's and nameSuffix's.

Pero no me funciona.
Se puede desactivar esta funcionalidad:
https://kubectl.docs.kubernetes.io/pages/reference/kustomize.html#generatoroptions
generatorOptions:
  disableNameSuffixHash: true


### Encriptar
https://teuto.net/deploying-jupyterhub-to-kubernetes-via-kustomize-using-sops-secret-management/
Mirar SOPS



# Plugins
https://github.com/kubernetes-sigs/kustomize/tree/master/docs/plugins

Podemos crear nuestros transformers o generators
