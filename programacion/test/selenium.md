mirar katalon.md para una interfaz para crear los tests

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

Arrancamos un nodo chrome y lo unimos al grid (al cluster, al nodo master):
docker run --link selenium-hub:hub selenium/node-chrome

El código python deberá apuntar a localhost:4444/wd/hub


# Webdriver
APIs para controlar un navegador y hacer los tests
Podemos programar estos tests en python
pip install selenium

Desde el codigo tendremos que poner el endpoint donde conectarnos


## Consejos
No intentar chequear HTTP return codes. Ser como un usuario y mirar las webs que resultan

Independencia entre tests, deben ser capaz de correr en cualquier orden.

No recomendado para hacer pruebas de performance. Hay muchas variables externas que pueden afectar, mejor usar Jmeter


## Locating elements
https://seleniumhq.github.io/docs/start.html#locating_elements

WebElement cheese = driver.findElement(By.id("cheese"));
WebElement cheddar = cheese.findElement(By.id("cheddar"));


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

