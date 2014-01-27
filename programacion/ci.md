Mirar tambien en devops/


La idea es que el desarrollador haga un commit.
Una máquina se dedique a coger esos commits y rehacer el proyecto.
Ese proyecto se monta en un entorno de test donde se le realizan unas pruebas automáticas.
Esas pruebas generan reportes sobre como han ido.

En caso satisfactorio ese commit puede pasar a prepro, donde el equipo de QA daría el visto bueno, y se pasaría a producción


La idea básica es que cada commit genera su propio automated deploy, y así se pueden aislar rápidamente los problemas que se puedan producir por errores del código.:


Manual Continuous Deployment vs. Automated Continuous Deployment: http://mayerdan.com/programming/2013/08/04/thoughts-on-continuous-deployment/


Mas info:
http://www.slideshare.net/beamrider9/continuous-deployment-at-etsy-a-tale-of-two-approaches
http://codeascraft.com/2010/05/20/quantum-of-deployment/
http://codeascraft.com/2011/02/04/how-does-etsy-manage-development-and-operations/
http://www.startuplessonslearned.com/2009/12/continuous-deployment-for-mission.html
http://java.dzone.com/articles/another-look-continuous
http://www.informit.com/articles/article.aspx?p=1641923
