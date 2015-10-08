url <- "http://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist.zip"
download.file(url, "eurofxref-hist.zip")
rates <- read.csv(unz("eurofxref-hist.zip", "eurofxref-hist.csv"), 
                  header = T)
rates$Date <- as.Date(rates$Date, "%Y-%m-%d")
rates <- rates[order(rates$Date), ]
#years <- format(rates$Date, "%Y")
#tab <- table(years)
source("./forecast.R")
result.arima <- forecastArima(rates, n.ahead = 90)
