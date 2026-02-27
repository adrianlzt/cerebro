EndpointSlices are a Kubernetes API resource that tracks network endpoints (IP:port combinations) for Services.
Purpose

- Replaces the older Endpoints resource (deprecated in v1.33+)
- Provides a scalable way to track Pod IPs backing a Service

How it works

1. Service defines a selector (e.g., app=frontend)
2. Kubernetes controller watches Pods matching that selector
3. Controller creates EndpointSlice with Pod IPs
4. kube-proxy uses EndpointSlices to configure routing rules

Example

Service: frontend (selector: app=frontend)
    ↓
EndpointSlice: frontend-xyz
    - Endpoints: 10.42.0.35:8080
    - References: pod/frontend-7f6bff4576-hbg8b
