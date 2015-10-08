# forecasting with ARIMA and STL
# Yanchang Zhao
# RDataMining.com
# July 2014


library(forecast)


## Forecast with STL model
forecastStl <- function(x, n.ahead=30){
  myTs <- ts(x$AUD, start=1, frequency=256)
  fit.stl <- stl(myTs, s.window=256)
  sts <- fit.stl$time.series
  trend <- sts[,"trend"]
  fore <- forecast(fit.stl, h=n.ahead, level=95)
  plot(fore)
  pred <- fore$mean
  upper <- fore$upper
  lower <- fore$lower
  output <- data.frame(actual = c(x$AUD, rep(NA, n.ahead)),
                       trend = c(trend, rep(NA, n.ahead)),
                       #pred = c(trend, pred),
                       pred = c(rep(NA, nrow(x)), pred),
                       lower = c(rep(NA, nrow(x)), lower),                       
                       upper = c(rep(NA, nrow(x)), upper),                       
                       date = c(x$Date, max(x$Date) + (1:n.ahead))
                       )
  return(output)
}


## Forecast with ARIMA model
forecastArima <- function(x, n.ahead=30){
  myTs <- ts(x$AUD, start=1, frequency=256)
  fit.arima <- arima(myTs, order=c(0,0,1))
  fore <- forecast(fit.arima, h=n.ahead)
  plot(fore)
  upper <- fore$upper[,'95%']
  lower <- fore$lower[,'95%']
  trend <- as.numeric(fore$fitted)
  pred <- as.numeric(fore$mean)
  output <- data.frame(actual = c(x$AUD, rep(NA, n.ahead)),
                       trend = c(trend, rep(NA, n.ahead)),
                       #pred = c(trend, pred),
                       pred = c(rep(NA, nrow(x)), pred),
                       lower = c(rep(NA, nrow(x)), lower),                       
                       upper = c(rep(NA, nrow(x)), upper),                       
                       date = c(x$Date, max(x$Date) + (1:n.ahead))  
                       )
  return(output)
}