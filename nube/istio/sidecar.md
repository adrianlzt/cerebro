Inyectar istio a algo ya desplegado:
kubectl apply -f <(istioctl kube-inject -f httpbin.yaml)
