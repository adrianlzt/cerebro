## gattlib
https://github.com/oscaracena/pygattlib

pip install gattlib

from gattlib import GATTRequester
req = GATTRequester("20:C3:8F:8A:5B:EA")
req.discover_characteristics()

No traduce UUIDs a su significado, lo podemos ver en wireshark

Se usa el handle en valor decimal:
req.read_by_handle(22)

O el uuid:
