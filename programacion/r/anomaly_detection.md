https://blog.twitter.com/2015/introducing-practical-and-robust-anomaly-detection-in-a-time-series
https://github.com/twitter/AnomalyDetection

Otra pieza:
https://github.com/twitter/BreakoutDetection


# Instalar
install.packages("devtools")
devtools::install_github("twitter/AnomalyDetection")
library(AnomalyDetection)

# Test
data(raw_data)
res = AnomalyDetectionTs(raw_data, max_anoms=0.02, direction='both', plot=TRUE)
res$plot
