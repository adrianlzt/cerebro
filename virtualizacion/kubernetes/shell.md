kubectl run --rm -it -t busybox --image=busybox

Con algo más para poder hacer tests:
kubectl run --rm -it -t alpine --image=alpine

kubectl run --generator=run-pod/v1 --rm -it -t alpine --image=alpine
