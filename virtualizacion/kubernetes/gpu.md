Kserve para servir modelos.

# Para repartir la carga sobre GPUs tenemos varias opciones

Hay que distinguir entre planificar (encontrar el nodo correcto que usar) y
limitar (que el workload no pueda user más de los recursos que le hayamos asignado).


https://github.com/volcano-sh/volcano - este parece más para training. Hace uso de MPS y/o MIG

https://run-ai-docs.nvidia.com

NVIDIA GPU Time-Slicing

tagging, tagear las tarjetas y especificarlas

DRA (ToDo) https://github.com/kserve/kserve/issues/5294
Pero esto no limitaría recursos

Estos si limitan el uso:

Este creo que es el que mejor pinta tiene
https://project-hami.github.io/HAMi/
Parece que por debajo usa DRA: https://project-hami.github.io/HAMi-DRA/

NVIDIA MPS (Multi-Process Service)

KAI Scheduler

NVIDIA Multi-Instance GPU (MIG) - si lo soportan nuestras GPUs
