http://docs.micropython.org/en/latest/esp8266/esp8266/tutorial/network_basics.html
https://docs.micropython.org/en/latest/esp32/quickref.html#networking

Dos interfaces, una para usar como cliente y otra para usar como AP.

>>> import network
>>> sta_if = network.WLAN(network.STA_IF)
>>> ap_if = network.WLAN(network.AP_IF)

Comprobar si estan activas:
>>> sta_if.active()
False
>>> ap_if.active()
True


Ver configuración actual:
>>> ap_if.ifconfig()
('192.168.4.1', '255.255.255.0', '192.168.4.1', '8.8.8.8')
The returned values are: IP address, netmask, gateway, DNS.


# Configurar como cliente
>>> sta_if.active(True)
>>> sta_if.connect('<your ESSID>', '<your password>')

Comprobamos si estamos conectados (tarda unos segundos)
>>> sta_if.isconnected()


Funcion para conectar
def do_connect():
    import network
    sta_if = network.WLAN(network.STA_IF)
    if not sta_if.isconnected():
        print('connecting to network...')
        sta_if.active(True)
        sta_if.connect('<essid>', '<password>')
        while not sta_if.isconnected():
            pass
    print('network config:', sta_if.ifconfig())
