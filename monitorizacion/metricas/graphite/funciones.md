http://graphite.readthedocs.org/en/latest/functions.html
http://obfuscurity.com/2012/04/Unhelpful-Graphite-Tip-1

Functions are used to transform, combine, and perform computations on series data. Functions are applied using the Composer interface or by manipulating the target parameters in the Render API.


Cuando tenemos algunos valores muy altos que nos "afean" la media, podemos sacarlos con estas funciones:
RemoveAbovePercentile
RemoveBelowPercentile
RemoveAboveValue
RemoveBelowValue
mostDeviant <- muy buena para ver lo que realmente está mal (eso he escuchado)


Si queremos descubrir la tendencia que subyace, en caso de no verla, podemos usar:
moving average <- no saben de "seasonality"
moving weighted average
Holt-Winters <- nos sirve para marcar valores esperados basado en datos pasados


Otras funciones interesantes:
Scale
Acummulative
Summarize
HitCount


groupByNode(collectd.*.cpu-*.cpu-idle,1,"avg")
Me saca el average de las "cpu-*" por cada nodo (collectd.nodo1, collectd.nodo2, etc). El '1' indica que se agrupa por el segundo elemento (empieza a contar en 0)

aliasByNode(collectd.*.df-root.percent_bytes-used,1)
En vez de poner el nombre entero, solo pone el apartado que esta en la posición '1' (el nodo en este caso)

alias(summarize(sumSeries(group(collectd.*.users.users)),"10sec"),"Total")
Para conseguir la suma de usuarios en todos los nodos. Solo con sumseries no se porque no funciona.
