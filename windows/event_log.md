https://blogs.msdn.microsoft.com/dcook/2015/09/30/etw-overview/

Event Tracing for Windows (ETW) is a system for routing events

Event Tracing for Windows (ETW) is a high-speed tracing facility provided by the Windows Operating System. ETW is the core tracing facility in Windows on top of which both the Event Log and WPP (Windows Software Tracing Pre-Processor) are built

Control Panel -> View event logs

También se pueden activar los modos analytics y debug que nos ofrecen más información.


ETW is primarily intended for diagnostic purposes and is optimized to minimize impact on the overall system performance

ETW should not be used for control purposes as it does not offer guaranteed delivery -- events might be lost in certain circumstances (e.g. if events occur too quickly or if the system shuts down before the events are saved to disk).

