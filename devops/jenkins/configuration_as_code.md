https://github.com/jenkinsci/configuration-as-code-plugin
https://docs.google.com/presentation/d/1VsvDuffinmxOjg0a7irhgJSRWpCzLg_Yskf7Fw7FpBg/edit#slide=id.g2c61443589_0_31

Configurar jenkins usando código en vez de complejos scripts en groovy


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

