https://docs.python.org/2/library/multiprocessing.html

Crear procesos distintos.
Parar crear threads (comparten memoria) mirar threads.md
Comparación: https://stackoverflow.com/questions/3044580/multiprocessing-vs-threading-python


from multiprocessing import Pool

def f(x):
    return x*x

if __name__ == '__main__':
    p = Pool(5)
    print(p.map(f, [1, 2, 3]))



from multiprocessing.pool import ThreadPool

def slow_function():
    do_whatever
results = ThreadPool(32).map(slow_command, list_of_things)
