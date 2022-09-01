https://github.com/stern/stern

kubectl krew install stern


Tail the kube-system namespace excluding logs from kube-apiserver pod
stern -n kube-system --exclude-pod kube-apiserver .

Tail the pods filtered by run=nginx label selector across all namespaces
stern --all-namespaces -l run=nginx
