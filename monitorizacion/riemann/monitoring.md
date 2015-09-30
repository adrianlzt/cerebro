http://riemann.io/howto.html#instrumenting-your-systems

Monitorizar overload de riemann:
You can detect this (and alert on it) by watching the service called "riemann netty execution-handler queue size"; if it starts getting above a thousand events or so, you're likely overloading Riemann. 

riemann-health, which measures the local host's cpu, memory, and disk use
