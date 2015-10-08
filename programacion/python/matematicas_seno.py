#!/usr/bin/env python

import matplotlib.pyplot as plt
import numpy as np

Fs = 8000
f = 5
sample = 16000
x = np.arange(sample)
y = np.sin(2 * np.pi * f * x / Fs)
plt.plot(x, y)
plt.xlabel('voltage(V)')
plt.ylabel('sample(n)')
plt.show()
