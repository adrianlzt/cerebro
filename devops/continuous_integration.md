Herramientas web para llevar un proyecto open source:
git + travis-ci + coveralls.io


Teoría:

Mejor hacer más despliegues más pequeños, que pocos cada mucho tiempo.
Es más sencillo hacer el proceso reversible ante cambios pequeños.
También es mejor para los desarrolladores, que los problemas seráń de prorgamación reciente.


Despliegue distribuido:
Repo con el código.
Testeo el código en una maqueta.
Si se pasan las pruebas, se pasa el código a producción.

CI: cada cambio lanza una integración
CD: cada integración lanza un despliegue

Se sube el código, se prueba y se sube automáticamente a producción.
Otras empresas meten un entorno de QA en medio.
