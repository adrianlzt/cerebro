mirar web/rod.md para una librería en go para manejar Chrome
mirar playwright para controlar con python


mirar katalon.md para una interfaz para crear los tests.
Nos da un plugin de chrome para generar los tests grabando las interaciones que hacemos en el navegador.

http://www.seleniumhq.org/

Opción más sencilla con scripts python: /home/adrian/adrianRepo/programacion/python/behave.md

robotframework nos permite definir en un DSL propio sencillo lo que queremos hacer. Él se encarga de levantar el navegador, realizar las pruebas y devolver el resultado
Mirar más abajo su sección


Selenium automates browsers. That's it. What you do with that power is entirely up to you. Primarily it is for automating web applications for testing purposes, but is certainly not limited to just that. Boring web-based administration tasks can (and should!) also be automated as well.

Selenium has the support of some of the largest browser vendors who have taken (or are taking) steps to make Selenium a native part of their browser. It is also the core technology in countless other browser automation tools, APIs and frameworks.


# IDE
Plugin para firefox que nos permite generar codigo que nos sirva como base para programar lo que queremos probar


# Docker
https://github.com/SeleniumHQ/docker-selenium/wiki/Getting-Started-with-Hub-and-Nodes

helm: https://github.com/SeleniumHQ/docker-selenium/tree/trunk/chart/selenium-grid

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

Mirar ejemplo en programacion/python/selenium_ejemplo.py



## Crear webdriver de chrome
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
driver = webdriver.Remote(command_executor='http://127.0.0.1:4444/wd/hub', desired_capabilities=DesiredCapabilities.CHROME)

Cuanto esperar a elementos del DOM en cada paso
driver.implicitly_wait(30)

Si queremos especificar el path exacto:
chrome_options.binary_location = '/usr/bin/chromium'


## Conectar al chrome local arrancado
Arrancar chromium con el parámetro:
--remote-debugging-port=9222

Luego configurar el driver como:
chrome_options = Options()
chrome_options.add_experimental_option("debuggerAddress", "127.0.0.1:9222")
driver = webdriver.Chrome(options=chrome_options)


## Teclas
Si queremos enviar pulsaciones de teclas.
Ejemplo para crear un nuevo tab

from selenium.webdriver.common.keys import Keys
driver.find_element_by_tag_name('body').send_keys(Keys.CONTROL + 't')


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


## Javascript
Ejecutar javascript como en la consola del navegador
driver.execute_script("document.getElementById('notifications-popover').remove()")



## Waits
https://seleniumhq.github.io/docs/wd.html#waits

Podemos tener problemas por que elementos de la web no se hayan cargado aún.
Por defecto solo se empieza a "navega" cuando document.readyState está a complete

Esperar 30s para la carga de la web:
driver.set_page_load_timeout(30)

Esperar 30s por cada llamada (por defecto está a 0, infinito):
driver.implicitly_wait(30)
  genera excepciones selenium.common.exceptions.NoSuchElementException

Explicit wait, tiempo de espera determinado para un elemento (https://selenium-python.readthedocs.io/waits.html)
Deberá ser mayor o igual que el implicitly_wait (si lo ponemos menor, esperara el tiempo de implicitly_wait y luego devolverá una expcecion TimeoutException)
from selenium.webdriver.support.ui import WebDriverWait
el = WebDriverWait(driver, 10).until(lambda d: d.find_element_by_tag_name("p"))
  genera excepciones selenium.common.exceptions.TimeoutException





# Proxy
Si queremos analizar lo que está pasando podemos usar:
https://bmp.lightbody.net
Certificado a meter en el navegador para que acepte los TLS del proxy: https://github.com/lightbody/browsermob-proxy/blob/browsermob-proxy-2.1.2/browsermob-core/src/main/resources/sslSupport/ca-certificate-rsa.cer
Lo que he hecho es configurar firefox con el proxy y luego decirle a selenium que use mi profile.
Arrancar el proxy:
  docker run --ulimit nofile=122880:122880 --rm -it -p 58080:8080 -p 58200:8200 bwowk/browsermob-proxy
  curl -X POST -d 'port=8200' http://localhost:58080/proxy
    crear proxy en el puerto 8200
  curl -X PUT http://localhost:58080/proxy/8200/har
    poner a grabar un HAR en ese proxy-puerto
  curl -X PUT http://localhost:58080/proxy/8200/har
    obtener el json del HAR y borrar
  curl http://localhost:58080/proxy/8200/har
    obtener el HAR desde la última vez que se borró

  El HAR que genera no es completo. Solo se ve la petición y el código de retorno.

  Si tenemos que meter un cert nuevo para que el proxy pueda conectar con un tercer servidor (una CA de nuestra empresa, por ejemplo):
    1.- arrancar el container con "sh"
    2.- copiarle el cert (docker cp ...)
    3.- meter el cert en los certs de java: keytool -import -alias UNNOMBRE -keystore /etc/ssl/certs/java/cacerts -storepass changeit -file /tmp/cert.pem
    4.- commitear el container: docker commit IDcorriendo browsermob-proxy-NUEVO
    5.- arrancar la imagen con ese container y especificando el command: docker run --ulimit nofile=122880:122880 --rm -it -p 58080:8080 -p 58200:8200 browsermob-proxy-NUEVO /home/browsermob-proxy-2.1.2/bin/browsermob-proxy



También podemos usar burp proxy, lo malo es que no exporta en HAR y no deja guardar (la versión grautita)




# Errores
is not clickable at point
Coger el elemento, esperar un poco y luego hacer click.
Puede ser por otras razones que esto no lo arregle



# robotframework
Configurar firefox para que use un profile determinado:
Suite Setup    Open Browser     https://example.com    firefox    ff_profile_dir=/home/adrian/.mozilla/firefox/3eh5eabz.light
