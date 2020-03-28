# Variables de entorno
Irían en el Deployment Config


# Configmaps
https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/
https://docs.openshift.org/latest/dev_guide/configmaps.html
https://unofficial-kubernetes.readthedocs.io/en/latest/tasks/configure-pod-container/configmap/

Es lo que usamos para almacenar configuraciones.
Estas configuraciones pueden ser valores o ficheros.
Luego las meteremos en los containers que las tendrán accesibles como venv.
O en caso de ser ficheros, lo podremos montar como directorios.

Los cambios en los ConfigMaps se despliegan en los ficheros montados en los pods.
Pero debe ser el pod el que actue ante un cambio del fichero de config.

Cambiando un configmap no inician un redeploy, es una best practice el considerar los configmaps inmutables y en todo caso si hace falta un cambio se debería crear un nuevo configmap y asosciarlo al deploymentconfig que este si iniciara el rollout.  Además parece que si el nuevo confirma está roto el dc fallará y no hará un scale down y si está bien entonces si arrancará tus pods
https://github.com/kubernetes/kubernetes/issues/22368

oc get cm

Ver contenido:
oc get cm nombre-config-map -o yaml

Para modificar, ver patch.md


Crear un configmap a partir de ficheros o un directorio (lo crea en la key "data.nombreFichero"):
kubectl create configmap game-config --from-file=docs/user-guide/configmap/kubectl


apiVersion: v1
kind: ConfigMap
metadata:
  name: name
data:
  key: value
  kibana.yml: |
    server.host: '0.0.0.0'
    server.port: 5601
    elasticsearch.url: 'http://elasticsearch:9200'



Los ConfigMaps se pueden montar como ficheros en un pod, pero son RO.
Si necesitamos que sean RW, usar un init container para copiar el ConfigMap a un volumen emptyDir
También pueden ser variables de entorno.


Ejemplo, config map como dir. Cada fichero del CM se pondrá en el path especificado en el volumeMount:
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: test-container
      image: gcr.io/google_containers/busybox
      command: [ "/bin/sh", "-c", "cat /etc/config/special.how" ]
      volumeMounts:
      - name: config-volume
        mountPath: /etc/config
  volumes:
    - name: config-volume
      configMap:
        name: special-config


Ejemplo forzando un path determinado:
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: test-container
      image: gcr.io/google_containers/busybox
      command: [ "/bin/sh","-c","cat /etc/config/path/to/special-key" ]
      volumeMounts:
      - name: config-volume
        mountPath: /etc/config
  volumes:
    - name: config-volume
      configMap:
        name: special-config
        items:
        - key: special.how
          path: path/to/special-key


Ejemplo añadiendo un fichero de un CM a un dir que ya existe en el pod
https://stackoverflow.com/a/43404857/1407722

        volumeMounts:
        - name: "config"
          mountPath: "/<existing folder>/<file1>"
          subPath: "<file1>"
        - name: "config"
          mountPath: "/<existing folder>/<file2>"
          subPath: "<file2>"
      restartPolicy: Always
      volumes:
        - name: "config"
          configMap:
            name: "config"


# Secrets
Igual que configmaps.
Son ficheros.
Solo lo puede ver el admin del proyecto.
Aunque no sería muy dificil saltarse la limitación para ver el secret (levantar un container y meternos en /run/secrets)

mirar secrets.md
