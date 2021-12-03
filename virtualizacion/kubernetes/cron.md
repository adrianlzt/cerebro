https://kubernetes.io/docs/tasks/job/automated-tasks-with-cron-jobs/
https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/


kubectl get cronjobs


#apiVersion: batch/v1beta1
apiVersion: batch/v1
kind: CronJob
metadata:
  name: hello
spec:
  schedule: "*/1 * * * *"  # app web para configurar este valor https://crontab.guru/
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


Si no queremos que la tarea se vuelva a ejecutar si hay un fallo:
https://stackoverflow.com/a/51687712

spec:
  concurrencyPolicy: Forbid  # ESTA OPCION
  failedJobsHistoryLimit: 1  # ESTA OPCION
  jobTemplate:
    metadata:
      creationTimestamp: null
    spec:
      backoffLimit: 0  # ESTA OPCION
      template: 
      ... MORE STUFF ...


# Jobs
Los cronjobs generarán jobs:
kubectl get jobs --watch

Los jobs se ejecutarán creando un pod

Solo se mantendrá el pod del último job.


Forzar un job a partir de un cronjob:
kubectl create job --from=cronjob/<name of cronjob> <name of job>
