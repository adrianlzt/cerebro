http://docs.micropython.org/en/latest/esp8266/esp8266/tutorial/filesystem.html

>>> f = open('data.txt', 'w')
>>> f.write('some data')
9
>>> f.close()


>>> f = open('data.txt')
>>> f.read()
'some data'
>>> f.close()


>>> import os
>>> os.listdir()
['boot.py', 'port_config.py', 'data.txt']
