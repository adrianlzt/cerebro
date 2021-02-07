https://scikit-learn.org/stable/

Simple and efficient tools for predictive data analysis
Accessible to everybody, and reusable in various contexts
Built on NumPy, SciPy, and matplotlib


# Supervised learning

## Decision Trees / classification and regression
https://scikit-learn.org/stable/modules/tree.html

Suponiendo que en x tenemos un DataSet con las columnas "a" y "b" como datos y "target" como resultado:

from sklearn.tree import DecisionTreeClassifier
clf = DecisionTreeClassifier()
clf.fit(x[["a","b"]],x["target"])
