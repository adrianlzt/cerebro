Si queremos comprobar la performance: monitorizacion/webpage_monitor.md
Mirar synthetic_monitoring.md

Mirar playwright.md

Mirar tamibén como alternativa https://www.cypress.io/
Que es lo que usa Grafana para hacer los tests a su app
https://github.com/grafana/grafana/blob/master/contribute/style-guides/e2e.md


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

Si falla el play, nos generará una screenshot.

En chrome, si seleccionamos un elemento con el Inspector, podemos copiar el XPath. Esto nos será útil si el xpath generado por Katalon falla (por ejemplo, toma el nombre de usuario como parte del path)


## Exportar
Una vez tengamos generados nuestro testcase, podemos exportarlo en diferentes lenguajes.
En python por ejemplo nos generará un script que se comunicará con un servidor selenium donde ejecutará el test.
CUIDADO! Mirar en el coigo si aparecen lineas tipo:
  # ERROR: Caught exception [ERROR: Unsupported command [selectWindow | win_ser_1 | ]]
Puede que algunas cosas no estén soportadas en python.

Si queremos exportar toda una test suite, nos tocará ir exportando cada test_case y copiando las funciones test_XXX.

Mirar en adrianRepo/monitorizacion/selenium.md como montar el server y el worker.

Por defecto el codigo que genera para python usar el navegador firefox e intenta conectar a localhost:4444

Tenemos que tener instalado el modulo de selenium para python para poder ejecutarlo.
  pip install selenium
  pipenv install selenium

Para usar un server remoto de selenium:
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
self.driver = webdriver.Remote(
   command_executor='http://127.0.0.1:4444/wd/hub',
   desired_capabilities=DesiredCapabilities.CHROME)

Por defecto parece que conecta con el chrome que tengamos arracado en local.



En python3, para quitar los errores tipo "ResourceWarning: unclosed <socket.socket...", al ejecutar el unitest (última línea) poner:
	unittest.main(warnings='ignore')
