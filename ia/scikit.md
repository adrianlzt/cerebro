https://scikit-learn.org/stable/

Simple and efficient tools for predictive data analysis
Accessible to everybody, and reusable in various contexts
Built on NumPy, SciPy, and matplotlib


# Preparar los datos / preprocessing

## Dividir en trainig and test test
Por defecto nos dividirá en 75/25% y aleatorizados.

from sklearn.model_selection import train_test_split
x_train, x_test, y_train, y_test = train_test_split(pd.read_csv('input/train.csv'))

No generaremos el CV set, ya que las funciones de cross validation lo harán automáticamente, entrenando el modelo y testeandolo con diferentes split de training y cv sets.


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
