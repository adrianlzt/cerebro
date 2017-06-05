Distintos algoritmos de ordenación:

# Bubble
Vamos swapeando los elementos si el primero es mayor que el segundo.
Tenemos que hacer varias pasadas

Ejemplo mio en python:
def bubble(a):
    swaped = False
    for i in range(0,len(a)-1):
        if a[i] > a[i+1]:
            swaped = True
            t = a[i+1]
            a[i+1] = a[i]
            a[i] = t
            
    if swaped:
        a=bubble(a)
    return a
