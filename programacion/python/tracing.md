https://docs.python.org/2/library/trace.html
https://docs.python.org/3.7/library/trace.html
https://coverage.readthedocs.io/en/v4.5.x/
python -m trace -gt prueba.py
  nos saca por donde pasa el programa con el timming


https://pymotw.com/3/sys/tracing.html
http://www.dalkescientific.com/writings/diary/archive/2005/04/20/tracing_python_code.html

Sacar cada linea por la que pasa el programa

Redirigir output a un fichero, puede generar ficheros muy grandes (con la CLI de ceph me generó un fichero de 27MB)
Con una prueba con yum me petaba

Meter este código:

import sys
import linecache

def traceit(frame, event, arg):
    if event == "line":
        lineno = frame.f_lineno
        filename = frame.f_globals.get("__file__")
        if (filename and (filename.endswith(".pyc") or
            filename.endswith(".pyo"))):
            filename = filename[:-1]
        name = frame.f_globals["__name__"]
        line = linecache.getline(filename, lineno)
        print("%s:%s: %s" % (filename, lineno, line.rstrip()))
    return traceit

sys.settrace(traceit)

main()
