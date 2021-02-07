https://scikit-learn.org/stable/user_guide.html
Tienen organizado el índice por supervised/unsupervised y luego todos los modelos que se puede implementar con scikit


Machine learning:
  supervised learning:
    regresión (generar una fórmula que "siga" los valores conocidos, para poder estimar resultados para valores desconocidos)
      reducir la cost function, nos ayudamos de gradient descent o normal equation
      regularización para evitar overfitting
    clasificación (devolver el porcentaje de si un input pertenece a un grupo de salida)
      lineal: regresión logística
        puede ser binaria o multiclase
        reducir la cost function, nos ayudamos de gradient descent o normal equation
        regularización para evitar overfitting
      redes neuronales


  unsupervised learning:




Tipos de métodos para encontrar outliers (sacados de https://www.elastic.co/guide/en/machine-learning/current/dfa-outlier-detection.html)
distance of Kth nearest neighbor
distance of K-nearest neighbors
local outlier factor (lof)
local distance-based outlier factor (ldof)
