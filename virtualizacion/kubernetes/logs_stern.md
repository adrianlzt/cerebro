https://github.com/stern/stern

kubectl krew install stern

Prefija los logs con el nombre del pod que los genera.

Tail the kube-system namespace excluding logs from kube-apiserver pod
stern -n kube-system --exclude-pod kube-apiserver .

Tail the pods filtered by run=nginx label selector across all namespaces
stern --all-namespaces -l run=nginx

kc stern --tail 40 -l app=foo
