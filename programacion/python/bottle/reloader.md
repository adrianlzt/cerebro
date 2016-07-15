http://bottlepy.org/docs/dev/tutorial.html#auto-reloading

Recarga la aplicación cada vez que hay algún cambio en uno de los módulos:

bottle.run(host='0.0.0.0', reloader=True, port=argv[1])

