http://man7.org/linux/man-pages/man7/namespaces.7.html
mirar network/ip.md #namespaces

(usando 'dimensión' como traducción de namespace)

Es tener diferentes dimensiones de las interfaces de red. Cada dimensión solo puede ver su interfaz.

Podemos tener un namespace donde tengamos una interfaz configurada con una red, y otro namespace con otra interfaz distinta que esté configurada para una red completamente distinta.
La interfaz física solo puede vivir en uno de los namespaces.
