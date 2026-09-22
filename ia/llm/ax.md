https://github.com/google/ax#quick-start
agentexecutor.io

Google's open agentic orchestration runtime

Se monta sobre https://github.com/agent-substrate/substrate

Substrate parece que requiere un despliegue especial de k8s (feature en kube-apiserver, gVisor, ClusterTrustBundle API).

# Install

```bash
go install github.com/google/ax/cmd/ax@latest

```

# Deploy

```bash
make deploy AX_IMAGE_REPO=nexusregistry.foo.com/ax
```

Crea esto:
```
clusterrole.rbac.authorization.k8s.io/ax-controller
clusterrolebinding.rbac.authorization.k8s.io/ax-controller
deployment.apps/ax-controller
deployment.apps/ax-redis
deployment.apps/ax-server
namespace/ax-system
service/ax-redis
service/ax-server
serviceaccount/ax-controller
```

Kubernetes debe tener acceso a ese registry.
