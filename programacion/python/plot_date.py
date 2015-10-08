#!/usr/bin/env python
#
# http://stackoverflow.com/questions/11067368/annotate-time-series-plot-in-matplotlib
#

import datetime as dt
import matplotlib.pyplot as plt
import matplotlib.dates as mdates

data=[1,2,3,4,4,3,3,4,5,6,2,3,4,1,2,3]
time=[1443716227,1443716287,1443716347,1443716407,1443716467,1443716527,1443716587,1443716647,1443716707,1443716767,1443716777,1443716787,1443716797,1443716867,1443716967,1443717167]
time_plt = mdates.epoch2num(time) # Formato necesario para plt

fig, ax = plt.subplots()
ax.plot_date(y=data, x=time_plt)
fig.autofmt_xdate()
plt.show()
