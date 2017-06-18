http://microservices.io/patterns/monolithic.html

Beneficios:
  - despliegue simple
  - desarrollo simple (solo una app en el IDE)
  - fácil de escalar, arrancar más copias

Contras:
  - dificil hacer modificaciones, miedo a romper algo
  - tarda mucho en arrancar
  - despliegue continuo, dificil cuando tienes que rearrancar toda la aplicación
  - podemos tener problemas al escalar, parte de la app tal vez sea cpu intesiva y otra parte intensiva en memoria, nos limita a incrementar todo
  - dificil hacerla seguir creciendo, si empieza a trabajar más gente con ella, será dificil que todo el mundo se ponga de acuerdo en los cambios
  - obligados a seguir con la tecnología que hayamos usado
