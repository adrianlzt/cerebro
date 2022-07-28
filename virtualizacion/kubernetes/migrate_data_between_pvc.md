Contenedor que crea un nuevo PVC y copia los datos desde otro PVC a este nuevo.
Nos puede servir si queremos mover datos entre dos PVC.

``````
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: matomo-disk
spec:
  storageClassName: db-lvm-spinning
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 15Gi
---
apiVersion: batch/v1
kind: Job
metadata:
  name: rsync
spec:
  template:
    spec:
      volumes:
      - name: old
        persistentVolumeClaim:
          claimName: matomo
      - name: new
        persistentVolumeClaim:
          claimName: matomo-disk
      restartPolicy: Never
      containers:
      - name: rsync
        image: eeacms/rsync
        command: ["rsync",  "-aP", "/mnt/old/", "/mnt/new/"]
        volumeMounts:
        - name: old
          mountPath: /mnt/old
          readOnly: false
        - name: new
          mountPath: /mnt/new
          readOnly: false
``````
