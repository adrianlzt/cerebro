https://github.com/exo-explore/exo

Run your own AI cluster at home with everyday devices

exo devices connect p2p. As long as a device is connected somewhere in the network, it can be used to run models.

Exo supports different partitioning strategies to split up a model across devices. The default partitioning strategy is ring memory weighted partitioning. This runs an inference in a ring where each device runs a number of model layers proportional to the memory of the device.
