No viene libreria por defecto.

Una que parece la estanadar de Julia:
https://github.com/dcjones/Gadfly.jl

Para instalarla: 
Pkg.add("Gadfly")

Para usarla:
using Gadfly

Gadfly is a plotting and data visualization system written in Julia.
It renders publication quality graphics to PNG, Postscript, PDF, SVG, and Javascript. The Javascript backend uses d3 to add interactivity like panning, zooming, and toggling.

El comando plot no saca nada por pantalla. Debemos usar draw para generar un fichero con el plot

Para ver gráficas en pantalla podemos usar IPython.
Una vez tenemos el notebook corriendo:
using Gadfly
plot(x=collect(1:100), y=sort(rand(100)))
Shift+Enter

El javascript que genera hace uso de la libreria D3:
p=plot(x=collect(1:100), y=sort(rand(100)))
draw(D3("mammals.js", 6inch, 6inch), p)

https://github.com/dcjones/Gadfly.jl#using-the-d3-backend
Ahí podemos obtener el código para generar el html con la gráfica
