https://blogs.msdn.microsoft.com/dcook/2015/09/30/etw-overview/

Event Tracing for Windows (ETW) is a system for routing events

Event Tracing for Windows (ETW) is a high-speed tracing facility provided by the Windows Operating System. ETW is the core tracing facility in Windows on top of which both the Event Log and WPP (Windows Software Tracing Pre-Processor) are built

Control Panel -> View event logs

También se pueden activar los modos analytics y debug que nos ofrecen más información.


ETW is primarily intended for diagnostic purposes and is optimized to minimize impact on the overall system performance

ETW should not be used for control purposes as it does not offer guaranteed delivery -- events might be lost in certain circumstances (e.g. if events occur too quickly or if the system shuts down before the events are saved to disk).



Impacto de performance
Q: Will event instrumentation impact the performance of my application?

In general, the performance impact of adding event instrumentation is negligible. If tracing is not enabled, the overhead is a few instructions for each EventWrite function call that are used to bypass the tracing call. If tracing is enabled, EventWrite will incur a few thousand cycles depending on the amount of data being logged and hardware characteristics of the computer. The EventWrite function is a non-blocking call and control will be returned to your application after the OS has received your event data.

When adding tracing to performance-sensitive code paths, you should measure the overhead with and without tracing to evaluate whether the additional overhead is acceptable. Adding instrumentation will cause the code size to increase, resulting in larger binaries and consequently a bigger memory foot-print, more page-faults and more cache misses. Also, the code path length will increase due to tracing calls being made.

