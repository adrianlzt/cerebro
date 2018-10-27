Los templates los definiremos en YAML usando mustache para tomar valores del values.yml o definidos en templates/_helpers.yml

También tendremos disponible el dict Release:
	Release.Name: The name of the release (not the chart)
	Release.Time: The time the chart release was last updated. This will match the Last Released time on a Release object.
	Release.Namespace: The namespace the chart was released to.
	Release.Service: The service that conducted the release. Usually this is Tiller.
	Release.IsUpgrade: This is set to true if the current operation is an upgrade or rollback.
	Release.IsInstall: This is set to true if the current operation is an install.
	Release.Revision: The revision number. It begins at 1, and increments with each helm upgrade.

Chart: The contents of the Chart.yaml. Thus, the chart version is obtainable as Chart.Version and the maintainers are in Chart.Maintainers. (solo los campos esperados, campos extra no serán aceptados)

Files: para acceder a otros ficheros que tengamos en el repo:
  {{index .Files "file.name"}}
  {{.Files.Get name}}
  {{.Files.GetString name}}

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



# tpl
https://github.com/helm/helm/blob/master/docs/charts_tips_and_tricks.md#using-the-tpl-function

Renderizar otros templates en nuestro template
