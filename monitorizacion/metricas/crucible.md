https://github.com/astanway/crucible

Crucible is a refinement and feedback suite for algorithm testing. It was designed to be used to create anomaly detection algorithms, but it is very simple and can probably be extended to work with your particular domain. It evolved out of a need to test and rapidly generate standardized feedback for iterating on anomaly detection algorithms.

Crucible uses its library of timeseries in /data and tests all the algorithms in algorithms.py on all these data. It builds the timeseries datapoint by datapoint, and runs each algorithm at every step, as a way of simulating a production environment. For every anomaly it detects, it draws a red dot on the x value where the anomaly occured. It then saves each graph to disk in /results for you to check, grouped by algorithm-timeseries.
