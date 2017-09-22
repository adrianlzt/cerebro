El "plan" funciona bien pero luego el apply falla.
Tal vez tenemos algun recurso externo a terraform que coincide con lo que queremos crear?
Lo podemos importar o borrar el creado manualmente.



Problema con un provider? Probar a ejecutar nosotros la acción en el provider manualmente.
Por ejemplo, con openstack, intentar asociar una ip floatante a una VM daba un error, pero es que desde la web tampoco dejaba hacerlo.
En este caso por problemas de que la floating ip no se podia asociar a esa red.
