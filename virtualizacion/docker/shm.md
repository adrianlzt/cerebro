Para definir el tamaño del punto de montaje /dev/shm dentro del contendor:

```bash
docker run --shm-size="2g"
```

Si queremos modificarlo en caliente:

```bash
sudo nsenter -t 2502360 --mount mount -o remount,size=4G /dev/shm
```
