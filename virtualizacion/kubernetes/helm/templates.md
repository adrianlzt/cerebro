Los templates los definiremos en YAML usando mustache para tomar valores del values.yml o definidos en templates/_helpers.yml

También tendremos disponible el dict Release:
  .Release.Name
  .Release.Namespace
  .Release.Service

Si queremos usar una variable de "Release" la llamaremos directamente:
{{ .Release.Name }}

Para usar una de values.yml usaremos el prefijo .Values:
{{ .Values.image.repository }}

Si queremos usar algo definido en _helpers.yml:
{{ include "FOO" . }}



# include
https://github.com/helm/helm/blob/master/docs/charts_tips_and_tricks.md#using-the-include-function

Función custom de helm.
{{ include "toYaml" $value | indent 2 }}
  Pasa el valor $value a una template llamada "toYaml". El valor retornado lo pasa a la pipe



# required
https://github.com/helm/helm/blob/master/docs/charts_tips_and_tricks.md#using-the-required-function

Util para mostrar un mensaje si nos falta una variable:
{{ required "A valid foo is required!" .Values.foo }}
