http://clusterlabs.org/doc/en-US/Pacemaker/1.0/html/Pacemaker_Explained/s-failure-migration.html

Stop failures are slightly different and crucial. If a resource fails to stop and STONITH is enabled, then the cluster will fence the node in order to be able to start the resource elsewhere. If STONITH is not enabled, then the cluster has no way to continue and will not try to start the resource elsewhere, but will try to stop it again after the failure timeout.



pacemaker chequea status cada x tiempo.
Si el status devuelve 1 (parado), pacemaker intenta arrancar el recurso.

Si consigue arrancar el recurso.
Luego le hace un status.
Si no está arrancando, lo intenta de nuevo infinitas veces.
Si queremos limitar esto (5 veces máximo, se olvida de los problemas tras 60s)
pcs resource update RECURSO migration-threshold=5 failure-timeout=60s
Si no lo consigue en ese numero de veces, hace stop.
Si stop funciona, mueve el cluster a otro nodo.
Si el stop no funciona, hace stonith.

Si no consigue arrancar el recurso
Lo reintenta (migration-threshold) y si no puede, lo intenta parar.
Si falla el stop, debería hacer STONITH
