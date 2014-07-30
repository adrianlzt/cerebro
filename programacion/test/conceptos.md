[10:06:35] Tools - Agustin: QA = pruebas de aceptacion
[10:06:39] Tools - Agustin: test cases
[10:06:47] Tools - Agustin: "te tiene que salir un combo A cuando pulses en X"
[10:06:54] Tools - Agustin: eso lo programo, y lo pruenbo con un Unit test
[10:06:58] Tools - Agustin: luego QA, lo valida
[10:07:10] Tools - Agustin: en INT, "interactuas" con otros servicios
[10:07:13] Tools - Agustin: o valores del entorno
[10:07:14] Tools - Agustin: por ejemplo
[10:07:16] Tools - Agustin: con una BBDD
[10:07:25] Tools - Agustin: un unit tests que se conecta a BBDD no es un unit tests
[10:07:29] Tools - Agustin: es un test de integracion
[10:07:51] Tools - Agustin: un test que se conecta "fisicamente" a una mñaqiuna para ejecutar un comando por ssh, no es unit, es integracion
[10:07:52] Tools - Agustin: etc
[10:08:06] Tools - Agustin: cualquier tests con mocks, nada real, es unit
[10:08:11] Tools - Agustin: de ahi viene lo de unitario

