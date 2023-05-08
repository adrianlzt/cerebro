https://www.django-rest-framework.org/

Genera una API para los modelos que tengamos definidos.
Tambíen genera una interfaz web para navegar por la API como la de AWX.

La idea es crear una función serializer de nuestro modelo, luego una vista y luego meterlo en el router.


Creando una entrada usando httpie
http -a admin:admin http://127.0.0.1:8000/probes/ name=apicreated url=http://pepe.com

Ejemplos con curl
https://www.django-rest-framework.org/tutorial/quickstart/#testing-our-api
