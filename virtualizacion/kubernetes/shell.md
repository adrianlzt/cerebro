 /home/adrian/adrianRepo/virtualizacion/kubernetes/shell.md
kubectl run --rm -it -t alpine --image=alpine



# Deployment alpine
apiVersion: v1
kind: Pod
metadata:
  name: alpine
  namespace: default
spec:
  containers:
  - image: alpine:3.2
    command:
      - /bin/sh
      - "-c"
      - "sleep 60m"
    imagePullPolicy: IfNotPresent
    name: alpine
  restartPolicy: Always
