http://codeascraft.com/2013/06/11/introducing-kale/

It consists of two parts: Skyline and Oculus. We first use Skyline to detect anomalous metrics. Then, we search for that metric in Oculus, to see if any other metrics look similar. At that point, we can make an informed diagnosis and hopefully fix the problem.


## Skyline ##
https://github.com/etsy/skyline
Skyline is an anomaly detection system. It shows all the current metrics that have been determined to be anomalous


## Oculus ##
https://github.com/etsy/oculus
Oculus is the anomaly correlation component of the Kale system. Once you’ve identified an interesting or anomalous metric, Oculus will find all of the other metrics in your systems which look similar.

