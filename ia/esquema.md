Como atacar por primera vez un problema:
 - empezar con un algoritmo simple que podamos implementar rápidamente. Testearlo con la cross_validation data
 - pintar learning curves para decidir si necesitamos más datos, más features, etc
 - análisis de errores: revisar a mano los valores del CV set donde el algoritmo falla. Mirar si podemos encontrar algún patrón donde esté fallando y ver que nueva feature nos podría ayudar a identificarlos
 - poder iterar rápido con distintas ideas es importante, obteniendo un "score" para poder ir comparando las distintas opciones

En diagnostic.md tenemos las herramientas para analizar un algoritmo.






# Modelos
https://scikit-learn.org/stable/user_guide.html
Tienen organizado el índice por supervised/unsupervised y luego todos los modelos que se puede implementar con scikit

  supervised learning:
    regresión (generar una fórmula que "siga" los valores conocidos, para poder estimar resultados para valores desconocidos)
      reducir la cost function, nos ayudamos de gradient descent o normal equation
      regularización para evitar overfitting
    clasificación (devolver el porcentaje de si un input pertenece a un grupo de salida)
      lineal: regresión logística
        puede ser binaria o multiclase
        reducir la cost function, nos ayudamos de gradient descent o normal equation
        regularización para evitar overfitting
      SVM: clasificador no lineal
      redes neuronales


  unsupervised learning:
    clustering:
      k-means
    anomaly detection



  Otros:
    dimensionality reduction
      PCA
    recommender systems
      pueden usar algoritmos supervisados y unsupervisados




Tipos de métodos para encontrar outliers (sacados de https://www.elastic.co/guide/en/machine-learning/current/dfa-outlier-detection.html)
distance of Kth nearest neighbor
distance of K-nearest neighbors
local outlier factor (lof)
local distance-based outlier factor (ldof)
