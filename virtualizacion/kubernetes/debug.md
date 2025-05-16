# Squash debugger for microservices

<https://github.com/jpetazzo/squash>

Aplicación para debuggear microservicios distribuidos en pod de manera simultanea usando un IDE (VS Studio)

# Traffic sniff

<https://github.com/eldadru/ksniff>
Plugin que nos levanta un wireshark local conectado al pod que le digamos

Install:
kubectl krew install sniff

Use:
kubectl sniff -n NAMESPACE <POD_NAME>

Si no me copia el bin de tcpdump, hacerlo a mano:
kc cp /home/adrian/.krew/store/sniff/513b04c6a63a287e9566c28a9d72fdd8d06c6aa0ab8eb30e5303923c97701ab8/static-tcpdump POD:/tmp/

Y luego reejecutar el sniff

# inspektor gadget

<https://github.com/kinvolk/inspektor-gadget>
Parece que casi todas las cosas solo funcionan en una distribución específica de k8s: <https://github.com/kinvolk/inspektor-gadget#gadgets>

Añade una serie de utilidades a kubectl para poder ver a bajo nivel como está funcionando un container.
bindsnoop Trace IPv4 and IPv6 bind() system calls
capabilities Suggest Security Capabilities for securityContext
deploy Deploy Inspektor Gadget on the worker nodes
execsnoop Trace new processes
help Help about any command
network-policy Generate network policies based on recorded network activity
opensnoop Trace files
profile Profile CPU usage by sampling stack traces
tcpconnect Suggest Kubernetes Network Policies
tcptop Show the TCP traffic in a pod
tcptracer trace tcp connect, accept and close
traceloop Get strace-like logs of a pod from the past

Inspektor Gadget is deployed to each node as a privileged DaemonSet
