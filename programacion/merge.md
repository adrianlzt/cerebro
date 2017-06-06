Distintos algoritmos de ordenación:
bubble: comparando parejas, swapeando las posiciones. O(n²)
selection: recorriendo el array buscando el más pequeño y moviéndolo al comienzo. O(n²)
merge: ordenamos por parejas, luego de 4 en cuatro, de 8 en 8, etc. O(n*logn)
quick: elegimos un elemento random, y ordenamos para que todos los elementos más pequeños estén a su izquierda y los mayores a la derecha. Luego lo hacemos para cada mitad, cada cuarto, etc. O(n*logn), o O(n²) a lo peor
bucket: creamos varios buckets donde se contendrán el conjunto de números entre determinados valores. Luego podemos usar otro algoritmo o buckets cada vez más pequeños. O(n+m) m=num distinto de elementos

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
