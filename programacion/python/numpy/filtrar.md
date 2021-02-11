X[X[:,2]<25,:]
  filtrar en la matriz, solo quedarnos con las filas cuya tercera columna (el índice empieza en 0) sea menor de 25

np.where(X[:,2]>=3)
  obtener los índices (los números de fila donde se hace match) donde la segunda columna de la matriz sea mayor o igual a 3
