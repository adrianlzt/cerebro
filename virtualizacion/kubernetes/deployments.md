# Scale
kubectl scale deployment.v1.apps/nginx-deployment --replicas=10

# Redeploy with latest
https://github.com/kubernetes/kubernetes/issues/33664

k8s 1.15:
kubectl rollout restart deployment/nombre


# spec.template
spec.containers
imagePullPolicy: Never | Always | IfNotPresent
