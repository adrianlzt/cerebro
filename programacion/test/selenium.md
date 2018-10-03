mirar katalon.md para una interfaz para crear los tests.
Nos da un plugin de chrome para generar los tests grabando las interaciones que hacemos en el navegador.

http://www.seleniumhq.org/

Opción más sencilla con scripts python: /home/adrian/adrianRepo/programacion/python/behave.md


Selenium automates browsers. That's it. What you do with that power is entirely up to you. Primarily it is for automating web applications for testing purposes, but is certainly not limited to just that. Boring web-based administration tasks can (and should!) also be automated as well.

Selenium has the support of some of the largest browser vendors who have taken (or are taking) steps to make Selenium a native part of their browser. It is also the core technology in countless other browser automation tools, APIs and frameworks.


# IDE
Plugin para firefox que nos permite generar codigo que nos sirva como base para programar lo que queremos probar


# Docker
https://github.com/SeleniumHQ/docker-selenium/wiki/Getting-Started-with-Hub-and-Nodes

Arrancamos un "hub" (como el nodo master):
docker run -p 4444:4444 --name selenium-hub selenium/hub
  interfaz web donde podemos ver los clientes conectados y la config del hub: http://localhost:4444/grid/console

Arrancamos un nodo chrome y lo unimos al grid (al cluster, al nodo master):
docker run --link selenium-hub:hub selenium/node-chrome

El código python deberá apuntar a localhost:4444/wd/hub


Si un programa python falla por excepcion, parece que a veces el worker se queda pillado.
Reiniciando el server se suele solventar.



# Webdriver
APIs para controlar un navegador y hacer los tests
Podemos programar estos tests en python
pip install selenium

Desde el codigo tendremos que poner el endpoint donde conectarnos



## Crear webdriver de chrome
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
driver = webdriver.Remote(command_executor='http://127.0.0.1:4444/wd/hub', desired_capabilities=DesiredCapabilities.CHROME)

Cuanto esperar a elementos del DOM en cada paso
driver.implicitly_wait(30)


### Throttle connetion / meter delay y limites de ancho de banda
https://stackoverflow.com/a/46672769
https://selenium-python.readthedocs.io/api.html#module-selenium.webdriver.chrome.webdriver

from selenium import webdriver
d = webdriver.Chrome()
d.set_network_conditions(latency=1000, offline=False,download_throughput=500 * 1024,upload_throughput=500 * 1024)
d.get("http://192.168.1.200:8001/")

Genera retraso en "Requesting the document, waiting for the first byte"

Parece que no es posible si tenemos el chrome en remoto.
https://stackoverflow.com/questions/52617943/selenium-set-network-conditions-on-remote-chrome



## Proxy
https://stackoverflow.com/a/40628176
from selenium.webdriver.common.proxy import Proxy, ProxyType
p = Proxy()
p.proxy_type = ProxyType.MANUAL
p.httpProxy = "213.19.58.17:48107"
#p.socks_proxy = "ip_addr:port"
#p.ssl_proxy = "ip_addr:port"
webdriver.Remote('http://127.0.0.1:4444/wd/hub', desired_capabilities=DesiredCapabilities.CHROME, proxy=p)




## Consejos
No intentar chequear HTTP return codes. Ser como un usuario y mirar las webs que resultan

Independencia entre tests, deben ser capaz de correr en cualquier orden.

No recomendado para hacer pruebas de performance. Hay muchas variables externas que pueden afectar, mejor usar Jmeter


## Locating elements
https://seleniumhq.github.io/docs/start.html#locating_elements
https://selenium-python.readthedocs.io/locating-elements.html

from selenium.webdriver.common.by import By
driver.find_element(By.XPATH, '//button[text()="Some text"]')
driver.find_elements(By.XPATH, '//button')



## Acciones
https://seleniumhq.github.io/docs/start.html#performing_actions_on_the_aut

Introducir texto
String name = "Charles";
driver.findElement(By.name("name")).sendKeys(name);

Click
driver.findElement(By.cssSelector("input[type='submit']")).click();


## Waits
https://seleniumhq.github.io/docs/wd.html#waits

Podemos tener problemas por que elementos de la web no se hayan cargado aún.
Por defecto solo se empieza a "navega" cuando document.readyState está a complete

Esperar a que aparezca un elemento:
el = WebDriverWait(driver).until(lambda d: return d.find_element_by_tag_name("p"))

