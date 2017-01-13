https://cran.r-project.org/web/packages/forecast/index.html
https://github.com/robjhyndman/forecast

Mirar estimar_curva.md para hacerlo con wolframalpha

Ejemplo de uso
http://www.rdatamining.com/examples/time-series-forecasting

# Instalacion
sudo R
install.packages("forecast")


# Ejemplo funcional
forecast_ejemplo.r
Usa las bibliotecas: forecast.R plotForecastResult.R

# Info
res = forecast(...)
str(res)

res$mean
valores calculados


# Ejemplo muy sencillo

library(forecast)

## Arima
plot(forecast(arima(ts(0:1000),order=c(0,0,1)), h=10))

Creo una serie de tiempos con valores 0,1,2,3,4, creo un tipo arima y se lo paso a la func forecast.
No funciona bien, la estimación no sigue la linea creciente.

## Auto Arima <- BUENO
plot(forecast(auto.arima(valores), h=50))

Este parece que si funciona bien con un diente de sierra creciente


res = forecast(auto.arima(0:10), h=2)
res$mean
  array con los valores calculados, en este caso 11 y 12




## ETS
plot(forecast(ets(1:100)))
Este si funciona bien

Estimación lineal, parece que coje los dos últimos valores y traza una recta.
