https://www.katalon.com/

Interfaz para generar tests que funciona encima de selenium

Nos permite crear y ejecutar tests.

Katalon Studio: a free testing solution supports Data-driven, Keyword-driven, TDD/BDD,  Parallel execution and CI integration with Automation Reports.



El Katalon Studio GUI no funciona sobre linux. Se puede usar la consola para ejecutar test.


# Extension para chrome
Para grabar tests podemos usar una extension para chrome
https://chrome.google.com/webstore/detail/katalon-recorder-selenium/ljdobmomdgdljniojadhoplhkpialdid?utm_source=chrome-ntp-icon

Lo que hace es ir grabando apertura de webs, clicks en sitios (determinados por el nombre del link o un xpath) y donde escribimos cosas.
Cuando lo genera no espera tiempos entre las acciones (solo si aún no ha aparecido el elemento HTML que tenga que usar)
Podemos seleccionar la velocidad de play en un ajuste a la derecha.


## Exportar
Una vez tengamos generados nuestro testcase, podemos exportarlo en diferentes lenguajes.
En python por ejemplo nos generará un script que se comunicará con un servidor selenium donde ejecutará el test.

Mirar en adrianRepo/monitorizacion/selenium.md como montar el server y el worker.

Por defecto el codigo que genera para python usar el navegador firefox e intenta conectar a localhost:4444

Tenemos que tener instalado el modulo de selenium para python para poder ejecutarlo.

Para usar un server remoto de selenium:
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
self.driver = webdriver.Remote(
   command_executor='http://127.0.0.1:4444/wd/hub',
   desired_capabilities=DesiredCapabilities.CHROME)

Por defecto parece que conecta con el chrome que tengamos arracado en local.
