https://folium.readthedocs.org/en/latest/

Mapa con dos marcadores:
>>> import folium
>>> map_1 = folium.Map(location=[45.372, -121.6972])
>>> map_1.simple_marker([45.3288, -121.6625], popup='Mt. Hood Meadows')
>>> map_1.simple_marker([45.3311, -121.7113], popup='Timberline Lodge')
>>> map_1.create_map(path='output.html')

