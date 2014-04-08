Para convertir mapas georeferenciados en jpg+jgw en tif:

Convertir jpg+jgw Proyección UTM ETRS89 Huso 30 N en tif georeferenciado
gdal_translate -a_srs EPSG:25830 image.jpg image.tif

Convertir jpg+jgw Proyección UTM ED50 Huso 30 N en tif georeferenciado
gdal_translate -a_srs EPSG:23030 image.jpg image.tif

Info de una imagen .tif
gdalinfo image.tif

Info de una imagen .jpg (debe tener tambien el fichero .jgw con el mismo nombre)
gdalinfo image.jpg
