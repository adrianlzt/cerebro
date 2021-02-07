https://scikit-learn.org/stable/

Simple and efficient tools for predictive data analysis
Accessible to everybody, and reusable in various contexts
Built on NumPy, SciPy, and matplotlib


# Supervised learning

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



Predecir valores:
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

