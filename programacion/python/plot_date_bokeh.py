from bokeh.plotting import figure, show, output_file, vplot

TOOLS = "pan,wheel_zoom,box_zoom,reset,save"

data=[1,2,3,4,4,3,3,4,5,6,2,3,4,1,2,3]
time=[1447013139,1447099139,1447185139,1447271139,1447357139,1447443139,1447529139,1447615139,1447701139,1447787139,1447873139,1447959139,1448045139,1448131139,1448217139,1448303139]
time_ms = map(lambda x: x*1000, time)

output_file("correlation.html", title="correlation.py example")

r = figure(x_axis_type = "datetime", tools=TOOLS)
#r.line(time_ms, data, color='#1F78B4', legend='VALORES') # linea
r.circle(time_ms, data, color='#1F78B4', legend='VALORES') # puntos

r.title = "Cosas"
r.grid.grid_line_alpha=0.3

show(vplot(r))  # open a browser
