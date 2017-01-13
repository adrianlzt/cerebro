https://facebook.github.io/react/docs/thinking-in-react.html

Dibujar lo que queremos diseñar.
Separar cada elemento y darle un nombre (serán nuestros componentes). Para saber como decidir que debe ser un componente podemos seguir la regla de que cada componente debe hacer una única cosa.

Esta separación también debería mapear muy bien con la fuente de datos de donde estemos leyendo. Por ejemplo, si nos están pasando un array de elementos, pues seguramente cada elemento del array sea un component.

Luego los organizaremos en un jerarquía de quien contiene a quien.

Crearemos una versión estática. Sería como meter el código HTML que corresponde a cada elemento e ir escribiendo quien llama a quien y como se pasan los valores. Ejemplo: https://codepen.io/lacker/embed/vXpAgj?height=600&theme-id=0&slug-hash=vXpAgj&default-tab=js&user=lacker&embed-version=2#result-box

In simpler examples, it's usually easier to go top-down, and on larger projects, it's easier to go bottom-up and write tests as you build.


Is it passed in from a parent via props? If so, it probably isn't state.
Does it remain unchanged over time? If so, it probably isn't state.
Can you compute it based on any other state or props in your component? If so, it isn't state.

