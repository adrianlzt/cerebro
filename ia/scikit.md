https://scikit-learn.org/stable/

Simple and efficient tools for predictive data analysis
Accessible to everybody, and reusable in various contexts
Built on NumPy, SciPy, and matplotlib

pip install scikit-learn

En conda:
https://intel.github.io/scikit-learn-intelex
conda install scikit-learn

Speed up
conda install scikit-learn-intelex
python -m sklearnex my_application.py


# Preparar los datos / preprocessing

## Dividir en trainig and test test
Por defecto nos dividirá en 75/25% y aleatorizados.

from sklearn.model_selection import train_test_split
x_train, x_test, y_train, y_test = train_test_split(pd.read_csv('input/train.csv'))

No generaremos el CV set, ya que las funciones de cross validation lo harán automáticamente, entrenando el modelo y testeandolo con diferentes split de training y cv sets.


## Normalizar
https://scikit-learn.org/stable/modules/preprocessing.html#preprocessing-normalization
https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.normalize.html

from sklearn.preprocessing import MinMaxScaler, StandardScaler
MinMaxScaler().fit_transform(v.reshape(-1,1))
  normaliza todos los valores al rango [0,1]

StandardScaler().fit_transform(v.reshape(-1,1))
  elimina la media y hace la variancia = 1


## Polynomial features / aumentar complejidad de los parámetros
https://stackoverflow.com/a/55944716/1407722

Nos sirve para cuando queremos hacer una regresión lineal o logarítmica y aumentar la complejidad de la curva para que se pueda adaptar mejor.
from sklearn.preprocessing import PolynomialFeatures
import numpy as np
poly = PolynomialFeatures(degree = 2, interaction_only=False, include_bias=False)
poly.fit_transform(np.array([[1,2],[2,3]]))
>>> array([[1., 2., 1., 2., 4.],
          [2., 3., 4., 6., 9.]])

En la primera fila tendremos: 1, 2, 1², 1*2, 2²
Convertirá los valores (x₁, x₂) en (x₁, x₂, x₁², x₁*x₂, x₂²)

Ejemplo cuando tenemos ya X e Y:
poly = PolynomialFeatures(degree = 2, interaction_only=False, include_bias=False)
X = poly.fit_transform(X)
Xtest = poly.fit_transform(Xtest)





# Supervised learning

## Linear regression
https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html

import numpy as np
from sklearn.linear_model import LinearRegression

X = np.array([[440], [383], [303], [225], [145], [96], [41]])
y = np.array([30, 50, 80, 110, 140, 160, 180])
reg = LinearRegression().fit(X, y)

reg.score(X, y)  # como de buena es la regresión
reg.coef_  # sería la "a" de y=ax+b
reg.intercept_  # sería la "b"
reg.predict(np.array([[225]]))  # estimar "y" a partir de un "x"



## Logistic regression

Dibujar las zonas de decisión.
https://scikit-learn.org/stable/auto_examples/linear_model/plot_logistic_multinomial.html#sphx-glr-auto-examples-linear-model-plot-logistic-multinomial-py

## Decision Trees / classification and regression
https://scikit-learn.org/stable/modules/tree.html

Crea un arbol anidado de if-else con el que decide el resultado.
Podemos visualizarlo en un gráfico.
Pueden sufrir de overfitting, hay que tunearlos.


Suponiendo que en x tenemos un DataSet con las columnas "a" y "b" como datos y "target" como resultado:

from sklearn.tree import DecisionTreeClassifier
clf = DecisionTreeClassifier()
clf.fit(x[["a","b"]],x["target"])

Para visualizarlo (usar xdot para abrir el fichero .dot):
from sklearn.tree import export_graphviz
export_graphviz(clf,out_file='titanic_tree.dot',feature_names=features,rounded=True,filled=True,class_names=['Survived','Did not Survive'])

Se puede mostrar también con matplotlib, pero la visualización y navegado de mucho peor:
from matplotlib import pyplot as plt
fig = plt.figure(figsize=(25,20))
tree.plot_tree(clf,feature_names=features,rounded=True,filled=True,class_names=['Survived','Did not Survive'])
plt.show()

Una visualización mucho mejor para este caso es https://github.com/parrt/dtreeviz#classification-decision-tree
Para cada hoja nos muestra una gráfica con los grupos y probabilidades.



## SVM
https://scikit-learn.org/stable/modules/svm.html
https://scikit-learn.org/stable/modules/generated/sklearn.svm.SVC.html#sklearn.svm.SVC


### Gaussian kernel / RBF
Elegir los parámetros C y γ: https://scikit-learn.org/stable/auto_examples/svm/plot_rbf_parameters.html#sphx-glr-auto-examples-svm-plot-rbf-parameters-py
Normalizar!




# Predecir valores:
predictions = clf.predict(test[["a", "b"]])



# Validar resultados / cross-validation / overfitting
Le pasamos al modelo (clf) los valores de entrada y los valores conocidos de salida.
Nos devuelve un porcentaje:
clf.score(train[features], train[target])

Para evitar overfitting podemos usar cross-validation
https://scikit-learn.org/stable/modules/cross_validation.html

Estimate the accuracy by splitting the data, fitting a model and computing the score 5 consecutive times:
from sklearn.model_selection import cross_val_score
cross_val_score(clf, train[features], train[target])

## metrics
https://scikit-learn.org/stable/modules/model_evaluation.html
Distintas métricas para saber como está funcionando nuestro modelo.


# Buscar parámetros óptimos
https://scikit-learn.org/stable/auto_examples/svm/plot_rbf_parameters.html#sphx-glr-auto-examples-svm-plot-rbf-parameters-py

Ejemplo para SVM con gaussian kernel, donde buscamos los parámetros C y γ:
C_range = np.logspace(-2, 10, 13)      # 13 valores desde -2 hasta 10, con escala logarítmica
gamma_range = np.logspace(-9, 3, 13)   # 13 valores desde -9 hasta 3, con escala logarítmica
param_grid = dict(gamma=gamma_range, C=C_range)
cv = StratifiedShuffleSplit(n_splits=5, test_size=0.2, random_state=42)  # Como vamos a dividir los datos entre train y test set (20%). Se crearán 5 grupos distintos
grid = GridSearchCV(svm.SVC(), param_grid=param_grid, cv=cv)  # Empezamos la búsqueda de parámetros óptimos
grid.fit(X, y)

print("The best parameters are %s with a score of %0.2f"
      % (grid.best_params_, grid.best_score_))




# Plot / dibujar
Cuando queramos graicos generados directamente por scikit debemos crear a priori una fig con matplotlib

from matplotlib import pyplot as plt
fig = plt.figure(figsize=(25,20))
tree.plot_tree(clf,feature_names=features,rounded=True,filled=True,class_names=['Survived','Did not Survive'])
plt.show()



## Histograma
Vale con DataFrame o Serie

from matplotlib import pyplot as plt
fig = plt.figure(figsize=(25,20))
df.plot.hist(bins=12, alpha=0.5)
plt.show()



# Paralelizar
https://medium.com/distributed-computing-with-ray/how-to-speed-up-scikit-learn-model-training-aaf17e2d1e1

Para usar más CPUs
from joblib import parallel_backend
with parallel_backend(backend="loky"):
    grid.fit(X, y)

También podemos aprovechar una red distribuída (varios computadores) con backend="ray"


# GPU
No hay soporte
https://scikit-learn.org/stable/faq.html#will-you-add-gpu-support



# Imágenes / scikit-image
https://scikit-image.org/

## Importar imagen
Nos da un array de numpy

from skimage import io
moon = io.imread(filename)
  usar parámetro as_gray=True si queremos una matriz 2d en vez 3d (rgb + alpha)



# manifold / MDS
Representar un conjunto de distancias entre puntos en un plano 2d o 3d.
https://gist.github.com/dc78fcd9a9e791e8f1e4abe4ac23afd5
