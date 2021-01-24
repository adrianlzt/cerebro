https://github.com/jenkinsci/configuration-as-code-plugin
https://docs.google.com/presentation/d/1VsvDuffinmxOjg0a7irhgJSRWpCzLg_Yskf7Fw7FpBg/edit#slide=id.g2c61443589_0_31

Configurar jenkins usando código en vez de complejos scripts en groovy
No vale para instalar plugins: https://github.com/jenkinsci/configuration-as-code-plugin#installing-plugins


Podemos levantar un jenkins, configurarlo a mano y luego obtener el yaml
http://localhost:8080/configuration-as-code/viewExport

El schema del yaml:
http://localhost:8080/configuration-as-code/reference



Verificar fichero de config:
https://github.com/jenkinsci/configuration-as-code-plugin/blob/master/docs/features/jsonSchema.md


Ejemplos de config:
https://github.com/jenkinsci/configuration-as-code-plugin/tree/master/demos

Ejemplos de secrets:
https://github.com/jenkinsci/configuration-as-code-plugin/blob/910e77b812d237a38b456f08081bf4364fd60826/demos/credentials/credentials.yaml


De variable de entorno:
jenkins:
  globalNodeProperties:
    - envVars:
        env:
          - key: SOME_CASC_ENV_VAR
            value: a value configured via JCasC


# Docker
https://www.digitalocean.com/community/tutorials/how-to-automate-jenkins-setup-with-docker-and-jenkins-configuration-as-code

Si lo queremos usar con docker crearemos una imagen custom deshabilitando el install wizard e instalando el plugin de JCasC.
El resto de la guia cubre aspectos interesantes.
