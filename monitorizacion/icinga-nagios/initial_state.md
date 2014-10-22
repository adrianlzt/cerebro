http://docs.icinga.org/latest/en/objectdefinitions.html

Esto no se muy bien que hace, ya que por defecto el estado es PENDING.

Para host:
By default Icinga will assume that all hosts are in UP states when in starts. You can override the initial state for a host by using this directive. Valid options are: o = UP, d = DOWN, and u = UNREACHABLE. Default: o.

Para service:
By default Icinga will assume that all services are in OK states when in starts. You can override the initial state for a service by using this directive. Valid options are: o = OK, w = WARNING, u = UNKNOWN, and c = CRITICAL. Default: o.
