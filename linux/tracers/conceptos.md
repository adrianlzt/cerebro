https://www.kernel.org/doc/Documentation/trace/

probes and uprobes (both dynamic tracing)
tracepoints and software events (static tracing)
PMCs (hardware counters)



- Flame Charts: x-axis shows the passage of time. Time-based patterns can be identified. For long profiles with short and changing code paths, the stack "flames" can appear thin and hard to read.

- Flame Graphs: x-axis sorts the stacks alphabetically, from origin to leaf. This maximizes merging of frames, allowing the big picture of CPU usage to be visualized. These can be useful in other cases, for example, non-regression testing, where a pair of flame graphs can be visually compared and small differences seen.

Ejemplo: si dos funciones son llamadas de forma intercalada, con un flame chart veremos la duración de cada llamada individual. Con un flame graph veremos la duración de todas las llamadas de la misma función puestas juntas.
