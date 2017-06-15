Como deberemos desplegar la aplicación.

# Strategy

## Rolling (default)
Si un pod no pasa su check de readiness no se admite.
Ante una nueva versión primero se lanzan los nuevos pods y no se paran los antiguos hasta que los nuevos pasan el readiness
Como se levantan los nuevos y se paran los viejos se hace por configuración en porcentaje

## Recreate
Para desplegar una nueva versión primero se detiene completamente la versión antigua y luego se levanta la nueva.
Necesario por ejemplo si tenemos que hacer migrations de una bbdd.

## Custom
Creamos una imagen que será desplegada y controlará el proceso.
En la doc no dan mucha info de como se debe hacer.
