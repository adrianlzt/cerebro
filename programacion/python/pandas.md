Pandas
http://pandas.pydata.org/

Python Data Analysis Library
pandas is an open source, BSD-licensed library providing high-performance, easy-to-use data structures and data analysis tools for the Python programming language

Nos permite trabajar con matrices.
Se basa en NumPy y para algunas cosas usaremos directamente numpy

PandaSQL (para usar sentencias SQL con Pandas)

# Install arch
pacman -S --needed python-pandas python-pandas-datareader python-numexpr python-bottleneck python-beautifulsoup4 python-jinja python-sqlalchemy python-scipy python-matplotlib python-psycopg2 python-tabulate python-fsspec


# Uso
Típica forma de importación:
import pandas as pd


# CSV
train = pd.read_csv('input/train.csv')

# Excel
excel = pandas.ExcelFile( '/Users/connorjohnson/Downloads/PET_PRI_SPT_S1_W.xls' )



# DataFrame / Matrices / Vectores
https://pandas.pydata.org/pandas-docs/stable/reference/frame.html

Usaremos la estructura DataFrame

Algunas operaciones necesitan usar numpy directamente (como calcular la inversa)

Definir un vector:
x = pd.DataFrame([1,2,3,4])

Si imprimimos x lo mostrará como una tabla, con sus cabeceras (si están definidas), mostrando solo algunas líneas del comienzo y final si hay muchas filas.

Una matriz (1,2 será la primera fila)
pd.DataFrame([[1,2],[3,4]])

Transpoer una matriz:
x.T

Invertir una matriz:
np.linalg.pinv(A)

## Acceder a columnas
x["nombre"]
Nos devuelte un tipo de dato "Series"

x[["Sex", "Survived"]]
Nos devuelve un DataFrame con únicamente esas dos columnas


## Quitar columnas
train = train.drop(['Name','SibSp','Parch', 'Ticket', 'Fare', 'Cabin', 'Embarked'],axis=1)


## head
Quedarnos únicamente con las tres primeras filas (ignorando la cabecera, que se respeta)
x.head(3)



# Series / pandas.core.series.Series

## map
Cambiar valores por otros.
Ejemplo, tenemos una serie con valores "male" y "female".
Usamos este cambio que nos devuelve otra serie con 1s y 0s (no modifica el dato original)
x.map({'male':1,'female':0})

## values / array
Si queremos extraer la info de una serie a un array
x.values
Nos devuelve un 'numpy.ndarray'
