https://github.com/kubernetes-sigs/kustomize
https://github.com/kubernetes-sigs/kustomize/blob/master/docs/README.md

Es una forma de componer y modificar ficheros YAML.
La idea es tener una base de YAML y luego otros que hagan pequeñas modificaciones (por ejemplo, por entorno).
También nos permite crear secrets fácilmente en el YAML.

Lo usaremos con:
kubectl apply -k directorio/

dry-run
kc apply -k overlays/development --dry-run=server
  the request is still processed as typical request: the fields are defaulted, the object is validated, it goes through the validation admission chain, and through the mutating admission chain, and then the final object is returned to the user as it normally would, without being persisted.

O podemos generar el yaml final con:
kustomize build dir/


En el directorio tendremos un fichero
kustomization.yaml


# Organización de ficheros

Otras opciones:
  Sin división de directorios en los distintos overlays:
  https://www.reddit.com/r/kubernetes/comments/sd50hk/kustomize_with_multiple_deployments_how_to_keep/

  Formato ArgoCD autopilot, con los overlays dentro de cada app:
https://www.reddit.com/r/kubernetes/comments/sd50hk/kustomize_with_multiple_deployments_how_to_keep/hub3nop/?utm_source=reddit&utm_medium=web2x&context=3

repo/
  base/
    kustomization.yml
    app1/
      deployment.yaml
      ingress.yaml
      kustomization.yml
    app2/
    app1/
      deployment.yaml
      role.yaml
      rolebinding.yaml
      pvc.yaml
      kustomization.yml
  overlays/
    development/
      kustomization.yml
      patches/
      resources/
      sealed-secrets/ (kubeseal)
    staging/
    production/


El kustomization.yaml de las base/apps será tipo:
```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
  - deployment.yml
  - ingress.yml
```


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
Hay 2 tipos: patchesJson6902 y strategicMerge

### patchesJSON6902
patches:
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

Si queremos modificar elementos en una lista tenemos que elegir la posición a fuego "env/0/value".
Podemos hacer un truco para primero testear si tenemos en esa posición lo que esperamos y luego modificarlo.
https://stackoverflow.com/a/75037408

- op: test
  path: /spec/containers/0/name
  value: my-app
- op: replace
  path: /spec/containers/0/command
  value: ["sh", "-c", "tail -f /dev/null"]

Otro ejemplo:
- op: test
  path: /spec/template/spec/containers/0/env/0/name
  value: TEMPO_STORAGE_TRACE_BACKEND_TYPE
- op: replace
  path: /spec/template/spec/containers/0/env/0/value
  value: azure



### strategicMerge
https://github.com/kubernetes/community/blob/master/contributors/devel/sig-api-machinery/strategic-merge-patch.md
https://kubectl.docs.kubernetes.io/references/kustomize/glossary/#patchstrategicmerge

Un parche que modifica algún campo de uno de los yaml base
No funciona si el yaml base tiene "namespace" configurado.

patches:
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


Si queremos modificar los elementos de un array (en vez de añadir). Solo dejará esa env var, borrado el resto:
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: loki-backend
spec:
  template:
    spec:
      containers:
        - name: loki
          env:
            - $patch: replace
            - name: SCHEMA_CONFIG_OBJECT_STORE
              value: azure


Borrar un elemento de una lista
volumes:
  - $patch: delete
    name: credential

volumeMounts:
  - $patch: delete
    mountPath: /secret/tempo/


# Replacements
Copiar valores de un recurso a otro
https://kubectl.docs.kubernetes.io/references/kustomize/kustomization/replacements/#example


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
