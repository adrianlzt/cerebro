Rendimiento para apps que necesitan "tiempo real"


Toda respuesta debe de ser inmediata -> menos de 400ms
  Si algo está tardando en responder, optimizar para reducirlo.

cachear, 1-5 segundos basta
  si tenemos 100000 clientes que leen un dato, cachear durante 5 segundos nos evitar tener que hacer peticiones a nuestra app/backend
  dependiendo del tipo de app podría ser un cacheo más largo

stateless
  muy importante
  evitar las sesiones
  mejora rendimiento en el servidor
  sin sesión todo será más sencillo
  será más sencilla la plataforma

código sencillo, pero efectivo

paraleliza lo que puedas
  cuidado con los threads.
    pocos, no aprovechas la cpu
    muchos, puedes ahogar el sistema
    hacer pruebas de carga
