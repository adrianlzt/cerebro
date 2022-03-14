https://realpython.com/numpy-scipy-pandas-correlation-python/

import numpy as np
x = np.arange(10, 20)
y = np.array([2, 1, 4, 5, 8, 12, 18, 25, 96, 48])
r = np.corrcoef(x, y)
