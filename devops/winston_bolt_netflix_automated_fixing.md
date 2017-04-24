http://techblog.netflix.com/2016/08/introducing-winston-event-driven.html
http://techblog.netflix.com/2017/04/introducing-bolt-on-instance-diagnostic.html

En wiston escriben scripts que se ejecutan cuando matchea una query contra su sistema de monitorizacion (Atlas).
Esta basado en https://stackstorm.com/
Su monitorización va enviando los eventos a un rabbitmq donde son procesadas por el "rule engine".

Bolt permite ejecutar esos scripts en las máquinas. Es un servicio que corre en cada máquina y exponer una API REST
Los "runbook" (los scripts para arreglar cosas) deben ser distribuidos previamente a los nodos con Bolt (van haciendo pooling de un repo con los runbooks).
El agente que dispara las ejecuciones manda a bolt ejecutar una tarea y luego va haciendo pooling para obtener el resultado (async).


Por que dejaron de usar ssh:
Before Bolt, we were using plain and simple SSH to connect to instances and execute actions as needed. While inbuilt in every VM and very flexible, there were some critical issues with using this model:

Security: Winston, or any other orchestrator, needs to be a bastion to have the keys to our kingdom, something we were not comfortable with
async vs. sync: Running SSH commands meant we could only run them in a sync manner blocking a process on the client side to wait for the action to finish. This sync approach has scalability concerns as well as reliability issues (long running actions were sometime interrupted by network issues)
History: Persisting what was run for future diagnostics.
Admin interface
