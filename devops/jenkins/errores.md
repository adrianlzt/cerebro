# Errores
## Problemas con ansible:
'ascii' codec can't encode character u'\xf3' in position 122: ordinal not in range(128)
Solo sale si lo ejecutamos con jenkins, ejecutándolo manualmente no da problemas
Lanzar ansible con:
PYTHONIOENCODING=UTF-8


## Llega un hook pero, se prepara el job pero no llega a ejecutarse
WARNING hudson.model.Executor#resetWorkUnit: Executor #-1 for master grabbed hudson.model.queue.WorkUnit@30e74488[work=singularity-cmdb-sync] from queue but master went off-line before the task's worker thread started. No termination trace available.

Usando la "cloud" de docker.

El problema es que el master se había quedado sin espacio y parece que se bloquea.

Hay que ir a la vista de nodo y "refrescar" el estado
https://issues.jenkins.io/browse/JENKINS-15283

Tras eso veremos la traza:
h.n.AbstractDiskSpaceMonitor#data: Putting principal back online as there is enough disk space again
