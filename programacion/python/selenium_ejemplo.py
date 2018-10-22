# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.common.proxy import Proxy, ProxyType
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import string
import random
import lorem
import requests
import time

def generate_random_string(size=10):
    return ''.join(random.choice(string.ascii_lowercase) for _ in range(size))

def generate_title():
    word1 = random.randint(5,10)
    word2 = random.randint(5,10)
    return generate_random_string(word1).capitalize() + " " + generate_random_string(word2)

def get_random_object_from_list(data):
    """Devuelve un elemento cualquiera del array pasado"""
    return data[random.randint(0, len(data) - 1)]

def get_tag():
    """Devuelve una tag de la lista disponible"""
    tags = ["devops", "linux", "windows", "elastic", "zabbix", "offtopic", "HPUX", "Madrid", "Barcelona"]
    return get_random_object_from_list(tags)

class ProxyList:
    def __init__(self, filename="proxies_no_anonimos.txt"):
        self.data = []
        self._parse(filename)

    def _parse(self, filename):
        with open(filename) as fd:
            self.data = [line.strip('\n') for line in fd.readlines()]

    def get(self):
        while True:
            p = get_random_object_from_list(self.data)
            print("Chequeando proxy %s" % p)
            try:
                r = requests.get('http://ifconfig.co', proxies={'http': 'http://%s' % p}, timeout=2)
                if r.ok:
                    break
            except Exception:
                pass

        return p

class User:
    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password

    def __str__(self):
        return self.email

class Users:
    def __init__(self):
        self.registered = []

    def new(self):
        """ Creamos una estructura usuario para intentar registrarlo en la web """
        name = generate_random_string()
        u = User(name, "%s@email.com" % name, name)
        return u

    def register(self, u):
        """ Llamada por la funcion que registra al usuario si todo ha ido bien """
        self.registered.append(u)

    def get_credentials(self):
        """ Devuelve un usuario que esta registrado """
        if len(self.registered) == 0:
            raise Exception("No tenemos aun usuarios registrados")

        # Un 3% de las veces devolvemos un usuario vacio para que falle el backend
        random_error = random.randint(0,99)
        if random_error < 3:
            return User("", "", "")

        return get_random_object_from_list(self.registered)

class Client:
    def __init__(self, proxy_list=[], users=None):
        if proxy_list:
            p = Proxy()
            p.proxy_type = ProxyType.MANUAL
            p.httpProxy = proxy_list.get()
        else:
            p = None

        self.driver = webdriver.Remote(
           command_executor='http://127.0.0.1:4444/wd/hub',
           desired_capabilities=DesiredCapabilities.CHROME, proxy=p)

        self.driver.implicitly_wait(10)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True

        self.users = users

    def first_run(self):
        try:
            self.create_user()
        except Exception as ex:
            error_file = "error_%s.png" % int(time.time())
            self.driver.get_screenshot_as_file(error_file)
            print("Screenhost en %s. Error: %s" % (error_file, ex))
            raise ex

        self.tearDown()

    def main(self):
        try:
            # Seleccion 1:
            #   - crear usuario
            #   - login usuario ya creado
            #   - no loguear
            #
            sel1 = random.randint(0,2)
            if sel1 == 0:
                self.create_user()
            elif sel1 == 1:
                self.login()

            # Random 2:
            #   - crear post (si esta logueado)
            #   - logout (si esta logueado)
            #   - navegar por posts
            #   - navegar por tags
            sel2 = random.randint(0,3)
            if sel2 == 0 and sel1 <= 1:
                self.create_post()
            elif sel2 == 1 and sel1 <= 1:
                self.logout()
            elif sel2 == 2:
                self.navegar_posts()
            elif sel2 == 3:
                self.navegar_tags()
        except Exception as ex:
            error_file = "error_%s.png" % int(time.time())
            self.driver.get_screenshot_as_file(error_file)
            print("Screenhost en %s. Error: %s" % (error_file, ex))

        self.tearDown()

    def create_user(self):
        print("create user")
        u = self.users.new()
        driver = self.driver
        driver.get("http://192.168.1.200:8001/")
        driver.find_element_by_link_text("Sign up").click()
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Have an account?'])[1]/following::input[1]").click()
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Have an account?'])[1]/following::input[1]").clear()
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Have an account?'])[1]/following::input[1]").send_keys(u.name)
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Have an account?'])[1]/following::input[2]").clear()
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Have an account?'])[1]/following::input[2]").send_keys(u.email)
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Have an account?'])[1]/following::input[3]").clear()
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Have an account?'])[1]/following::input[3]").send_keys(u.password)
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Have an account?'])[1]/following::button[1]").click()

        # Chequear que la web devuelta es la pagina de inicio, que suponemos que quiere decir que todo ha ido bien
        m = self.driver.find_element_by_xpath('//*[@id="root"]/div/nav/div/ul/li[4]/a/img')
        try:
            assert u.name == m.get_property("alt")
        except Exception:
            raise Exception("Tras POST de generar usuario, no se ha llegado a la web que muestra su nombre")

        self.users.register(u)

    def login(self):
        print("login user")
        u = self.users.get_credentials()
        driver = self.driver
        driver.get("http://192.168.1.200:8001/")
        driver.find_element_by_link_text("Sign in").click()
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Need an account?'])[1]/following::input[1]").click()
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Need an account?'])[1]/following::input[1]").send_keys(u.email)
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Need an account?'])[1]/following::input[2]").send_keys(u.password)
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Need an account?'])[1]/following::button[1]").click()

        # Chequear que la web devuelta es la pagina de inicio, que suponemos que quiere decir que todo ha ido bien
        m = self.driver.find_element_by_xpath('//*[@id="root"]/div/nav/div/ul/li[4]/a/img')
        try:
            assert u.name == m.get_property("alt")
        except Exception:
            raise Exception("Tras POST de login usuario, no se ha llegado a la web que muestra su nombre")

    def logout(self):
        print("logout")
        driver = self.driver
        driver.get("http://192.168.1.200:8001/")
        driver.find_element_by_xpath('//a[@href="/settings"]').click()
        driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Update Settings'])[1]/following::button[1]").click()

    def create_post(self):
        titulo = generate_title()
        subtitulo = generate_title()
        texto = lorem.paragraph()
        tag1 = get_tag()
        tag2 = get_tag()

        print("Creando articulo con titulo: '%s', tags: %s" % (titulo, [tag1, tag2]))
        driver = self.driver
        driver.get("http://192.168.1.200:8001/")
        time.sleep(1)  # Evita el error "element is not attached to the page document"
        driver.find_element_by_xpath('//*[@id="root"]/div/nav/div/ul/li[2]/a').click()
        driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div/form/fieldset/fieldset[1]/input").send_keys(titulo)
        driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div/form/fieldset/fieldset[2]/input").send_keys(subtitulo)
        driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div/form/fieldset/fieldset[3]/textarea").send_keys(texto)
        driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div/form/fieldset/fieldset[4]/input").send_keys(tag1)
        driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div/form/fieldset/fieldset[4]/input").send_keys(Keys.ENTER)
        driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div/form/fieldset/fieldset[4]/input").send_keys(tag2)
        driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div/form/fieldset/fieldset[4]/input").send_keys(Keys.ENTER)
        driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div/form/fieldset/button").click()

        # Chequear que la web devuelta es la pagina de inicio, que suponemos que quiere decir que todo ha ido bien
        m = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[1]/div/h1')
        try:
            assert titulo == m.text
        except Exception:
            raise Exception("Tras POST de crear articulo, no se ha llegado a la web que muestra el articulo")

    def navegar_posts(self):
        print("navegar posts")
        driver = self.driver
        driver.get("http://192.168.1.200:8001/")
        posts = driver.find_elements_by_xpath('//a[@class="preview-link"]')

        # Si no encontramos posts es porque estamos logueados. Ir a global feed
        if not posts:
            driver.find_element_by_xpath("//ul[contains(@class, 'nav-pills')]/li[2]/a").click()
            posts = driver.find_elements_by_xpath('//a[@class="preview-link"]')

        if not posts:
            raise Exception("No consigo capturar posts")

        for i in range(0,random.randint(3,8)):
            p = get_random_object_from_list(posts)
            p.click()
            driver.find_element_by_link_text("conduit").click()
            posts = driver.find_elements_by_xpath('//a[@class="preview-link"]')  # Hace falta volver a obtener los posts tras cargar de nuevo la lista
            if not posts:
                driver.find_element_by_xpath("//ul[contains(@class, 'nav-pills')]/li[2]/a").click()
                posts = driver.find_elements_by_xpath('//a[@class="preview-link"]')

    def navegar_tags(self):
        """Cojo la lista de tags y pincho en unas cuantas"""
        print("navegar tags")
        driver = self.driver
        driver.get("http://192.168.1.200:8001/")
        tag_list = driver.find_element_by_xpath('//div[@class="tag-list"]')
        tags = tag_list.find_elements_by_xpath("a")

        for i in range(0,random.randint(3,8)):
            t = get_random_object_from_list(tags)
            t.click()
        # TODO: una vez elegido tag, navegar por los articulos de ese tag

    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e: return False
        return True

    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException as e: return False
        return True

    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True

    def tearDown(self):
        self.driver.quit()
        assert self.verificationErrors == []

if __name__ == "__main__":
    proxy_list = ProxyList()
    proxy_list = None
    users = Users()

    c1 = Client(proxy_list, users)
    c1.first_run()

    while True:
        print("---")
        c1 = Client(proxy_list, users)
        c1.main()
