https://graph-tool.skewed.de/
aur/python-graph-tool

Graph-tool is an efficient Python module for manipulation and statistical analysis of graphs (a.k.a. networks).


# Pinta grafo a partir de fichero .gml
from graph_tool.all import *
g = load_graph(file_name)
graph_draw(g)
