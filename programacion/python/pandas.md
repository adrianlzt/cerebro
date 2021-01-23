# Pandas
http://pandas.pydata.org/

Python Data Analysis Library

pandas is an open source, BSD-licensed library providing high-performance, easy-to-use data structures and data analysis tools for the Python programming language

Nos permite trabajar con matrices.
Se basa en NumPy y para algunas cosas usaremos directamente numpy

PandaSQL (para usar sentencias SQL con Pandas)

Típica forma de importación:
import pandas as pd

## CSV
Nos sirve también para parsear .csv
excel = pandas.ExcelFile( '/Users/connorjohnson/Downloads/PET_PRI_SPT_S1_W.xls' )

## DataFrame / Matrices / Vectores
https://pandas.pydata.org/pandas-docs/stable/reference/frame.html

Usaremos la estructura DataFrame

Algunas operaciones necesitan usar numpy directamente (como calcular la inversa)

Definir un vector:
pd.DataFrame([1,2,3,4])

Una matriz (1,2 será la primera fila)
pd.DataFrame([[1,2],[3,4]])

Transpoer una matriz:
x.T

Invertir una matriz:
np.linalg.pinv(A)
