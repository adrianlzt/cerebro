Arquitectura distribuida.

Maestro + agentes.

Maestro:
ActiveMQ + postgre + mongo

Los agentes se conectan al master.

Cada agente tiene un facter con los parámetros que tiene, de modo que podemos definir custom facts.
Asi podemos decidir donde ejecutar una composición, por ejemplo, en agentes con dos procesadores y que sean 32bits.

También podemos unir agentes en pools, y mandar tareas a un pool determinado.


Una composición debe ejecutarse en un solo agente, pero podemos concatenar varias composiciones usando el "Failure composition".
De esta manera podríamos ejecutar una composición en un agente, luego otra composición otro agente, etc.

El agente es un demonio, se podría ejecutar varios agentes en un mismo host para paralelizar.
