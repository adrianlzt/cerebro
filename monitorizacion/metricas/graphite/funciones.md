http://graphite.readthedocs.org/en/latest/functions.html

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


