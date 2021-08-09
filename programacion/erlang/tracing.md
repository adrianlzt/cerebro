http://erlang.org/doc/man/erlang.html#trace_pattern-2
Una librería que nos simplifica el tracing con erlang: http://ferd.github.io/recon/recon_trace.html

Se pasa una información a la VM (BEAM) diciendo que cuando una función haga match, se genere una traza y se envíe a un proceso.

Solo para traceo local.
Útil para debugging.
Solo se permite uno por BEAM. Si una librería de tracing distribuído los usase, no se podría usar por el desarrollador para debugear.
