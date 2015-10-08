https://stat.ethz.ch/R-manual/R-patched/library/stats/html/ts.html

Valores es un array con el precio cada año empezando en 2010
A la función ts() le pasamos los valores, le decimos que tomamos una muestra cada año y que empiezan en 2010
> valores=c(100,50,90,80,40,20,20,20,30,40,60,90,150,200,200,10,10)
> plot(ts(valores, frequency=1, start=c(2010)))



Ahora le estamos diciendo que hemos tomado una muestra cada mes empezando en julio-2010
> valores=c(100,50,90,80,40,20,20,20,30,40,60,90,150,200,200,10,10)
> plot(ts(valores, frequency=12, start=c(2010,7)))


Si ponemos:
frequency = 4, start = c(1959, 2) # 2nd Quarter of 1959
