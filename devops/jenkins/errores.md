# Errores
Problemas con ansible:
'ascii' codec can't encode character u'\xf3' in position 122: ordinal not in range(128)
Solo sale si lo ejecutamos con jenkins, ejecutándolo manualmente no da problemas
Lanzar ansible con:
PYTHONIOENCODING=UTF-8
