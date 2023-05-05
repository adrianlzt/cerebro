https://developers.google.com/optimization/scheduling/job_shop?hl=en

Programado en C++, pero con wrappers para distintos lenguajes, entre ellos python.

En este fichero podemos ver las funciones a las que podemos llamar, donde podemos ver la documentación.
ortools/sat/python/cp_model.py

Parece que por este wrapper al definir las cosas se hace de forma un poco "rara".

Por lo que entiendo, lo que hacemos es declarar un model:
model = cp_model.CpModel()

Y vamos creando sobre ese modelo variables, intervalos, restricciones, etc.

# Declarar variables
b = model.NewBoolVar('b')
Declara una variable de nombre "b" que puede tomar valores entre 0 y 1.

x = model.NewIntVar(0, 10, 'x')
Esta declara una variable tipo int, nombre "x", que puede tomar valores entre 0 y 10.

start_var = model.NewIntVar(0, horizon, 'start')

interval_var = model.NewIntervalVar(start_var, duration, end_var, 'nombre')
Creates an interval variable from start, size, and end.
An interval variable is a constraint, that is itself used in other constraints like NoOverlap.
Internally, it ensures that `start + size == end`.


# Constraints

## Expression
Aquí ponemos expresiones de las limitaciones que declaramos en el modelo.
model.Add(intVar1 => intVar2)
Adds a `BoundedLinearExpression` to the model.
Ejemplos de expresiones:
model.Add(x + 2 * y -1 >= z)


## NoOverlap
Esto crearía una limitación de que estos dos intervalos no se pueden sobreponer:
model.AddNoOverlap([interval1, interval2])

Adds NoOverlap(interval_vars).
A NoOverlap constraint ensures that all present intervals do not overlap in time.

## NoOverlap2D
Que no haya solapamiento en un plano.
Se definen cajas con tamaño en X e Y.
Esta constraint consigue que no se solapen.


# Cumulative.
Permite ejecutar N tareas simultaneamente.
Cada tarea tendrá una demanda (podrá ser 1 o más).
Al definir esta función declararemos una capacidad máxima.

La capacidad puede ser una variable o un valor fijo.


# Funciones/Helpers (no se muy bien como se nombrar esta sección)

## max / AddMaxEquality
Esto pone en obj_var el valor máximo de var1, var2 y var3.

obj_var = model.NewIntVar(0, horizon, 'maximo')
model.AddMaxEquality(obj_var, [var1, var2, var3])


# Objetive

Ejemplo de un objetivo del modelo, que sería minimizar el valor de esa variable.
model.Minimize(obj_var)


# Solver
solver = cp_model.CpSolver()
status = solver.Solve(model)


status nos devuelve como de bien se consiguió el objetivo.
FEASIBLE (2):   if some solutions have been found
INFEASIBLE (3): if the solver has proved there are no solution
OPTIMAL (4):    if all solutions have been found
