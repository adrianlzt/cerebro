Finding errors with static analysis: vet
The vet tool checks code for common programmer mistakes:
bad printf formats,
bad build tags,
bad range loop variable use in closures,
useless assignments,
unreachable code,
bad use of mutexes,
and more.

go vet [pkg]
