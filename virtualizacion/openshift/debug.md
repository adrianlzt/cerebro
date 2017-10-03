# Diagnosis
oc adm diagnostics


# Troubleshooting
https://access.redhat.com/solutions/1542293
Troubleshooting OpenShift Container Platform: Basics


https://access.redhat.com/solutions/1599603
Common issues on OpenShift Container Platform 3



Ver lo que está solicitando openshift a docker:
sysdig fd.name contains /var/run/docker.sock and proc.name=openshift and evt.type=write -c echo_fds
