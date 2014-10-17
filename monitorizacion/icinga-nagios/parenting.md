http://docs.icinga.org/latest/en/networkreachability.html

Si tenemos una red con router y switches podemos usar la directiva "parents" para especificar que hosts cuelgan de que router o switch.
En el caso de que un switch/router se caíga (estado DOWN), los hosts que cuelgen de él apareceran en estado UNREACHABLE en vez de DOWN.

Un host puede tener varios parents. El orden da igual.
Se deberá poner todos los switches/routers que se encuentren en el camino entre icinga (entre los slaves) y el host
