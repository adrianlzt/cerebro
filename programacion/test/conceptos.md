https://martinfowler.com/tags/testing.html
https://martinfowler.com/articles/practical-test-pyramid.html

End-to-end: https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html
https://docs.google.com/presentation/d/15gNk21rjer3xo-b1ZqyQVGebOp_aPvHU3YH7YnOMxtE/edit#slide=id.g437663ce1_53_98

Google often suggests a 70/20/10 split: 70% unit tests, 20% integration tests, and 10% end-to-end tests


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

