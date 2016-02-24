# Conectando a la consola del nodemcu
Esto deberia devolvernos un prompt ('>') segun conectemos.
Si no lo vemos, pulsar el boton de reset.

Por defecto: 
sudo picocom -b 9600 /dev/ttyUSB0

Si queremos podemos subir la velocidad:
uart.setup(0, 115200, 8, 0, 1, 1 )
sudo picocom -b 115200 /dev/ttyUSB0


Parece que por defecto el nodemcu monta una red wifi (ESP_xxxx) donde el se conecta con ip 192.168.4.1
Contesta a ping, pero si le preguntas por su ip no la conoce.
Si intento enviar un paquete a otra ip no parece funcionar



# Wifi
http://nodemcu.readthedocs.org/en/dev/en/modules/wifi/
wifi.setmode(wifi.STATION)
wifi.sta.config("moto","pass") 
print(wifi.sta.getip())

Puede funcionar como AP y cliente simultáneamente.

# Conex tcp
conn=net.createConnection(net.TCP, 0)
conn:on("receive", function(conn, payload) print(payload) end)
conn:connect(80, "115.239.210.27")
conn:send("GET / HTTP/1.1\r\nHost: www.baidu.com\r\n"
.. "Connection: keep-alive\r\nAccept: */*\r\n\r\n")
