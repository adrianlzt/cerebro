# DSL
Escribir scripts para, por ejemplo, crear a partir de un job, una serie de jobs con unas configuraciones específicas.
La documentación está en: http://JENKINS_SERVER/plugin/job-dsl/api-viewer/index.html
https://github.com/jenkinsci/job-dsl-plugin/wiki

Podemos obtener un poco de pistas creando una con la interfaz web y luego viendo su definición en XML:
http://JENKINS_SERVER/job/NOMBRE/config.xml

Crear directorio
folder(folderName) {
  displayName("path1/path2")
}

Definir un array e iterar por él:
def environments = ['int', 'pre', 'pro'] as String[]
environments.eachWithIndex{ environment, idx ->
  ...
}

Crear un job tipo freesyle:
freeStyleJob( serviceName +'/'+ phase + '_' + environment ) { ... }




A veces tenemos que formar una string para pasarla como parámetro. Si se queja haciendo esto:
projects("${serviceName}/${phase}_int")

Probar con:
def nextBuild = "${serviceName}/${phase}_int" as String
projects(nextBuild)



Si es obligatorio definir un parámetro pero no queremos darle valor
block null

Si tuviesemos que darle valor sería:
block {
  buildStepFailureThreshold("...")
  ...
}
