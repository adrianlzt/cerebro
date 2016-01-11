http://bokeh.pydata.org/en/latest/index.html
http://bokeh.pydata.org/en/latest/docs/reference.html
http://bokeh.pydata.org/en/latest/docs/gallery/correlation.html

mirar plot_date_bokeh.py


Cuando tenemos la gráfica generada podemos mostrarla (genera el html y lo abre) o guardarla (solo genera el html):

save(...)
show(...)


# Labels
http://bokeh.pydata.org/en/latest/docs/user_guide/styling.html#labels

Etiquetas para decir que es cada eje


# Colors
http://bokeh.pydata.org/en/latest/docs/user_guide/styling.html#specifying-colors
http://bokeh.pydata.org/en/0.8.1/docs/reference/properties.html?highlight=line_color#bokeh.mixins.LineProps.line_color
color es line y fill color

http://www.w3schools.com/cssref/css_colornames.asp

## Palettes
bokeh.palettes.
 bokeh.palettes.Greens3
 bokeh.palettes.PuOr4
 bokeh.palettes.RdYlGn6
 ...

## Random
import random
r = lambda: random.randint(0,255)
print('#%02X%02X%02X' % (r(),r(),r()))

# Axis
https://github.com/bokeh/bokeh/blob/master/bokeh/plotting_helpers.py#L161
linear
log
datetime
auto

## Ticker
http://bokeh.pydata.org/en/latest/docs/user_guide/styling.html#tick-locations
p = figure(plot_width=400, plot_height=400)
p.circle([1,2,3,4,5], [2,5,8,2,7], size=10)
p.xaxis[0].ticker=FixedTicker(ticks=[2, 3.5, 4])

## Formater
http://bokeh.pydata.org/en/latest/docs/user_guide/styling.html#tick-label-formats
http://bokeh.pydata.org/en/0.10.0/docs/user_guide/styling.html#printftickformatter
https://github.com/bokeh/bokeh/blob/master/bokeh/models/formatters.py

from bokeh.models import NumeralTickFormatter
from bokeh.models import PrintfTickFormatter

p.yaxis[0].formatter = NumeralTickFormatter(format="$0.00")
p.xaxis[0].formatter = PrintfTickFormatter(format="%4.1e")

Para imprimir numeros con distintos formatos:
http://bokeh.pydata.org/en/0.10.0/docs/reference/models/formatters.html#bokeh.models.formatters.NumeralTickFormatter

'0.0 a'
Para poner en k, mega, etc

'0.0 b' para bytes, KB, MB, etc


# Range
Puede ser del tipo Range o Sequence (list es del tipo Sequence)

p = figure(y_range=factors)

http://bokeh.pydata.org/en/latest/docs/reference/models/ranges.html


# Plots
http://bokeh.pydata.org/en/latest/docs/user_guide/layout.html#grid-layout

from bokeh.plotting import vplot
vplot(p1,p2,p3)
  vertical plot

from bokeh.plotting import hplot
hplot(p1,p2,p3)
  horizontal plot

Si tenemos un array con los plots:
plots=[p1,p2,p3]
hplot(*plots)


from bokeh.plotting import gridplot
gridplot([[s1, s2], [None, s3]])
  matriz de plots


Si tenemos un array con los plots, y queremos sacar dos por fila:
    plots = [p1,p2,p3,p4,p5]
    odd = len(plots)%2 == 1
    grid_plots = []
    for n in range(len(plots)/2):
        grid_plots.append([plots.pop(0),plots.pop(0)])
    if odd:
        grid_plots.append([plots.pop(0),None])

    show(gridplot(grid_plots))
