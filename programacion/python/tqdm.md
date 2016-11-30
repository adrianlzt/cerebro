https://github.com/tqdm/tqdm
http://blog.rtwilson.com/my-top-5-new-python-modules-of-2015/

from tqdm import tqdm

for item in tqdm(items):
    process(item)


# Nested / varias barras de progreso
Podemos poner aqui tambien tqdm en vez de trange. Trange es un tqdm(range(...))


from tqdm import trange
from time import sleep

for i in trange(10, desc='1st loop'):
    for j in trange(5, desc='2nd loop', leave=False):
        for k in trange(100, desc='3nd loop'):
            sleep(0.01)
