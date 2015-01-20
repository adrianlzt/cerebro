primitive NetCAT lsb:dummy \
        meta target-role="Started" \
        op monitor interval="30s" \
        meta migration-threshold="5"

El migration-threshold nos idica cuantos fallos acepta el recurso antes de marcar un nodo como no elegible.

failure-timeout (por defecto a 0). Cuantos segundos esperar antes de que el cluster se olvide de que había marcado un nodo como no elegible.

multiple-active: que hacer cuando pacemaker encuentra varios recursos activos. Por defecto para todos, y arranca unicamente uno.


Mas meta opciones: http://clusterlabs.org/doc/en-US/Pacemaker/1.0/html/Pacemaker_Explained/s-resource-options.html
