https://kubernetes.io/docs/tasks/job/automated-tasks-with-cron-jobs/
https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/


kubectl get cronjobs


apiVersion: batch/v1
kind: CronJob
metadata:
  name: hello
spec:
  schedule: "*/1 * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: hello
            image: busybox
            args:
            - /bin/sh
            - -c
            - date; echo Hello from the Kubernetes cluster
          restartPolicy: OnFailure


# Jobs
Los cronjobs generarán jobs:
kubectl get jobs --watch

Los jobs se ejecutarán creando un pod

Solo se mantendrá el pod del último job.
