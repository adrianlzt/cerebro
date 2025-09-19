<https://k3s.io/>

mirar distros.md

# Install

En arch
aur/k3s
aur/k3s-bin

## k3d / correr en docker

<https://www.suse.com/c/introduction-k3d-run-k3s-docker-src/>
AUR/rancher-k3d-bin

k3d cluster create NOMBRE

# Run

systemctl start k3s

Por debajo arranca un container con containerd.

## Agentes

Para conectar varios nodos podemos tener uno central y varios agentes.

```
systemctl cat k3s-agent
```

Para comunicación internodo se usa flannel, udp 8472.

# Config

Si tenemos varias interfaces, tendremos que configurar --flannel-iface= --node-ip=

## Server

Podemos editar el unit para pasarle parámetros al server.
Mirar:
k3s server --help

## Clientes

Config para kubectl, tendremos que pasarlo a ~/.kube/config
/etc/rancher/k3s/k3s.yaml

# Add new nodes

En el master node:

```bash
cat /var/lib/rancher/k3s/server/node-token
```

Coger la ip del master node.
En el nuevo nodo.
Instalar k3s:

```bash
curl -sfL https://get.k3s.io | K3S_URL=https://myserver:6443 K3S_TOKEN=mynodetoken sh -
```

# Volumes

Tenemos un storageclass "local-path" por defecto.
Deberemos crear los PV a mano.

# LoadBalancer / klipper

Parece que viene instalado por defecto y usa traefik.

K3s is designed to be lightweight and run anywhere, including on bare-metal servers or VMs where there's no cloud provider API to call. This is where its built-in service
load balancer, called Klipper (or svclb), comes in.

Here’s the mechanism:

 1. Detection: The Klipper controller, running as part of the k3s server, watches for new services of type: LoadBalancer.
 2. DaemonSet Creation: When it sees one (like our ingress-nginx-controller service), it automatically creates a DaemonSet. A DaemonSet is a Kubernetes workload that
    ensures a specific pod runs on every node in the cluster.
 3. Host Port Exposure: The pods in this DaemonSet are simple proxies. They are configured to listen on specific ports directly on the host node's network interface. This
    means they grab ports on the actual machine, outside the cluster's internal network.
 4. Traffic Forwarding: When external traffic arrives at http://<IP_OF_A_NODE>:<PORT>, the Klipper pod running on that specific node receives it and forwards it to the
    corresponding service inside the cluster (in this case, the NGINX controller's service).

In short, Klipper uses your own cluster nodes as the load balancer.

Ejemplo de ingress para klipper:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: echo-server-ingress
  annotations:
    traefik.ingress.kubernetes.io/router.entrypoints: web
spec:
  ingressClassName: traefik
  rules:
  - host: echo.79.76.123.62.nip.io
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: echo-server-service
            port:
              number: 80
```

# Uninstall

<https://rancher.com/docs/k3s/latest/en/installation/uninstall/>
<https://github.com/rancher/k3s/issues/84#issuecomment-468464353>

<https://raw.githubusercontent.com/rancher/k3s/master/install.sh>
mirar create_uninstall

Limpiar:
sudo kill -9 `cat /sys/fs/cgroup/systemd/system.slice/k3s.service/cgroup.procs`
sudo umount `cat /proc/self/mounts | awk '{print $2}' | grep '^/run/k3s'`
sudo umount `cat /proc/self/mounts | awk '{print $2}' | grep '^/var/lib/rancher/k3s'`
sudo umount $(cat /proc/self/mounts | awk '{print $2}' | grep '^/run/netns/cni')
  creo que esto puede impactar containers corriendo de otras cosas
sudo umount $(cat /proc/self/mounts | awk '{print $2}' | grep '^/var/lib/kubelet')
sudo rm -rf /var/lib/rancher/k3s
sudo rm -rf /etc/rancher/k3s
