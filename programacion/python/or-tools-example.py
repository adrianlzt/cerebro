#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#

"""
POC para demostrar como podemos conseguir un scheduling óptimo para las sondas.

Simplificamos las sondas a unos objetos que tienen un periodo, una duración.
Lo que tenemos que conseguir es el offset (delay inicial) para cada sonda, de forma que se minimice el uso de CPU.
Esa minimización de uso de CPU es reducir la paralelización de las sondas, que haya el mínimo posibles de sondas
ejecutándose al mismo tiempo.

Hacemos uso de la librería ortools de Google (librería de optimización).
La clave está en generar unos intervalos por cada ejecución de cada sonda, y luego decirle al modelo que esos intervalos
deben solaparse lo menos posible en el tiempo.

Para conseguir eso seteamos una serie de restricciones al modelo:
 - cada ejecución de cada sonda debe empezar después de self.period minutos de la anterior.
 - debe reducir la capacidad del sistema (reducir la paralelización)

La función "AddCumulative" nos permite pasarle una variable de capacidad (número de CPUs). Luego le pedimos al modelo
que la minimice.
"""

from ortools.sat.python import cp_model

class Probe:
    """ This class is used to represent a probe.

    This probe runs each period minutes, for duration minutes.
    It starts at offset minutes.
    """

    def __init__(self, duration=1, period=1, offset=0, name=None):
        if duration > period:
            raise ValueError("Duration must be less than period.")
        self.duration = duration
        self.period = period
        self.offset = offset
        self.name = name
        if name is None:
            self.name = f"d{duration}-p{period}"
        # Donde almacenamos las ortools intervals que representan las ejecuciones de la probe.
        self.intervals = []

    def generate_intervals(self, horizon, model):
        """ Generate the list of ortools intervals representing the executions of the probe.

        Save that list in self.executions.
        Add a constraint so each execution starts after self.period minutes from the previous one.
        Esto es, si la probe tiene un periodo de 5m, la ejecución 1 no puede empezar hasta que haya pasado 5m desde el inicio de la ejecución 0.

        horizon: the time horizon in which to calculate the executions.
        model: the ortools model to add the intervals to.
        """
        prev_start_var = None
        for i in range(horizon // self.period):
            # Generamos unos intervalos que el modelo deberá organizar correctamente
            # según las constrains que le digamos.
            start_var = model.NewIntVar(0, horizon, f"{self.name}-start-{i}")
            end_var = model.NewIntVar(0, horizon, f"{self.name}-end-{i}")
            self.intervals.append(model.NewIntervalVar(start_var, self.duration, end_var, f"{self.name}-interval-{i}"))

            # Restricción para que cada ejecución empiece después de self.period minutos de la anterior.
            if prev_start_var:
                model.Add(start_var >= prev_start_var + self.period)
                prev_start_var = start_var

    def __str__(self):
        return f"Probe: duration={self.duration:<3}, period={self.period:<3}, offset={self.offset}"

    def __repr__(self):
        return self.__str__()

def calculate_offset(probes):
    """Dada una serie de probes, calcular el offset para minmimizar el uso de CPU"""

    # Para calcular el scheduling óptimo, debemos definir un horizonte, un tiempo máximo sobre el que realizar el cálculo.
    # Tomamos el máximo periodo de las probes, entendiendo que una vez pasado ese periodo máximo, las probes simplemente seguiran reptiéndose.
    # TODO esto no tengo del todo claro que sea cierto. Parece cierto si los periodos fuesen cuadrando, pero para periodos tipo, 33m y otro de 60m, no lo veo claro. Revisar
    horizon = max([probe.period for probe in probes])

    model = cp_model.CpModel()

    # Creamos una variable con todos los intervals, para poder pasarla a la función AddCumulative
    all_intervals = []
    for probe in probes:
        probe.generate_intervals(horizon, model)
        all_intervals.extend(probe.intervals)

    # Definimos la variable que queremos optimizar.
    # El máximo sería el número de sondas a ejecutar.
    capacity_var = model.NewIntVar(0, len(all_intervals), 'num_cpus')

    # Cada tareas solo consume una CPU
    demands_var = [1] * len(all_intervals)

    # def AddCumulative(self, intervals, demands, capacity)
    # Definimos que solo se pueden solapar "capacity_var" al mismo tiempo.
    # Cada ejecución de cada sonda solo solicita un recurso de esa capacidad.
    # model.AddCumulative(intervals, [0 for _ in range(len(probes_executions))], capacity_var)
    model.AddCumulative(all_intervals, demands_var, capacity_var)


    # El objetivo es reducir la capacidad del sistema
    model.Minimize(capacity_var)

    # En este código lo que le decimos al modelo es que queremos conseguir que el tiempo
    # de fin de las distintas tareas tiene que ser lo más pequeño posible.
    # Se hace en dos pasos.
    # Primero se define obj_var como max(fin_job1, fin_job2, fin_job3).
    # Luego se le dice que su objetivo es reducir ese valor.

    solver = cp_model.CpSolver()
    solver.parameters.max_time_in_seconds = 60.0
    status = solver.Solve(model)
    # status será un valor entre 2, 3 o 4.
    # cp_model.OPTIMAL 4
    # cp_model.FEASIBLE 2
    # cp_model.INFEASIBLE 3 <- no se ha encontrado solución


    # Pintar el resultado
    if status == cp_model.OPTIMAL or status == cp_model.FEASIBLE:
        print('Solution:')
        print(f'Optimal number cpu: {solver.ObjectiveValue()}')
        print("Probes mostrando el offset calculado")

        for probe in probes:
            # Obtenemos el offset como el start time de la primera ejecución de cada probe.
            offset=solver.Value(probe.intervals[0].StartExpr())
            probe.offset = offset
            print(probe)

    else:
        raise ValueError("No se ha encontrado solución")

def main():
    # Declaramos las probes que queremos ejecutar
    probes = [
        Probe(duration=3, period=5),
        Probe(duration=2, period=5),
        Probe(duration=1, period=10),
    ]

    calculate_offset(probes)

if __name__ == '__main__':
    main()
