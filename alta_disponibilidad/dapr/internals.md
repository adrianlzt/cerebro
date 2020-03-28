# darpd
Es un binario compilado estáticamente

Cuando arranca, se pone a probar si puede conectar a localhost:portApp y se queda ahí en bucle hasta que se levante el puerto.


# Docker
El despliegue está configurado con el pull policy de Always.
Por lo que siempre se intentará bajar las nuevas imágenes de los componentes de dapr.

Esto también incluye cuando funciona el inyector, que intentará bajarse la última versión de la imagen.
