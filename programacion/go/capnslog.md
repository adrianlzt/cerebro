https://github.com/coreos/capnslog

Ejemplo del formato:
2021-08-20 16:12:14.509867 I | dolly: Hello Dolly
2021-08-20 16:12:14.509928 W | dolly: Well hello, Dolly
2021-08-20 16:12:14.509935 E | main: It's so nice to have you back where you belong
2021-08-20 16:12:14.509942 I | You're still glowin', you're still crowin', you're still lookin' strong
2021-08-20 16:12:14.509945 C | main: Dolly'll never go away again


Log levels have specific meanings:
Critical: Unrecoverable. Must fail.
Error: Data has been lost, a request has failed for a bad reason, or a required resource has been lost
Warning: (Hopefully) Temporary conditions that may cause errors, but may work fine. A replica disappearing (that may reconnect) is a warning.
Notice: Normal, but important (uncommon) log information.
Info: Normal, working log information, everything is fine, but helpful notices for auditing or common operations.
Debug: Everything is still fine, but even common operations may be logged, and less helpful but more quantity of notices.
Trace: Anything goes, from logging every function call as part of a common operation, to tracing execution of a query.
