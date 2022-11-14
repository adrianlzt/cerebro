# Generar manifest de k8s a partir de un pod
podman generate kube POD/container -s -f out.yaml

-s nos generará también el service
Los volume mounts los generará como
volumes:
  - hostPath:
      path: /home/adrian/Documentos/arduino/medidor_fuerza/var/lib/influxdb
      type: Directory



podman play kube pod.yml
