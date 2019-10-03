https://github.com/kubernetes-sigs/kind

# Install
GO111MODULE="on" go get sigs.k8s.io/kind@v0.5.1

# Run
kind create cluster

Config en /home/adrian/.kube/kind-config-kind
Podemos meter esa config en nuestro ~/.kube/config
