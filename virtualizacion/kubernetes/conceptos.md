# Pod (algo parecido a las tasks en docker swarm)
https://kubernetes.io/docs/concepts/workloads/pods/pod/

A pod is a group of one or more containers, the shared storage for those containers, and options about how to run the containers

Kubernetes deploys and schedules containers in groups called pods. A pod will typically include 1 to 5 containers that collaborate to provide a service.


# Services (como los services de docker swarm)
Services are endpoints that can be addressed by name and can be connected to pods using label selectors. The service will automatically round-robin requests between the pods. Kubernetes will set up a DNS server for the cluster that watches for new services and allows them to be addressed by name.


# Replication controllers
Replication controllers are the way to instantiate pods in Kubernetes. They control and monitor the number of running pods for a service, improving fault tolerance.
