https://docs.fluentd.org/v0.12/articles/buffer-plugin-overview

Como se almacena la información en caso de no poder enviarse.

El buffer va almacenando información, en un chunk, hasta que se excede el tamaño máximo (buffer_chunk_limit) o el tiempo (flush_interval,).
Cuando esto sucede, se envia el chunk al output y se vuelve a empezar a almacenar información en otro chunk.
Un buffer por cada output.

Si el chunk que debe salir no lo consigue, fluentd vuelve a intentarlo transcurrido un tiempo (retry_wait)
Si tampoco lo consigue, doblará el tiempo (sin sobre pasar max_retry_wait) y volverá a intentarlo.
Lo intentará tantas veces como esté definido en retry_limit, que en el caso de superarse el chunk se eliminará.

Los chunks que no se están pudiendo enviar se van almacenando en una cola de tamaño buffer_queue_limit.
Si esta cola se llena, no se admiten nuevos eventos y se genera una señal para avisar a los input plugins.

buffer_queue_full_action define como se debe avisar a los input plugins https://docs.fluentd.org/v0.12/articles/buffer-plugin-overview#bufferqueuefullaction):
 - exception (default): el input plugin generará una excepción cuando se intente enviar información, será decisión de cada plugin que hacer (https://github.com/fluent/fluentd/blob/v0.12.40/lib/fluent/plugin/in_tail.rb#L301)
 - block: stops input plugin thread until buffer full is resolved. This action is good for batch-like use-case (cuidado con abusar, leer web)
 - drop_oldest_chunk: useful for monitoring system destinations. For monitoring, newer events are important than older


Valores por defecto para los plugins de buffer:
buffer_chunk_limit = 8MB (8*1024*1024)
buffer_queue_limit = 256


Por defecto estará configurado el buffer memory (https://github.com/fluent/fluentd/blob/v0.12.40/lib/fluent/plugin/buf_memory.rb)
buffer_queue_limit = 64
Usará como máximo 512MB
