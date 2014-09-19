https://code.google.com/p/mockito-python/
https://code.google.com/p/mockito-python/wiki/Tutorial
programacion/test/mock.md

Simular un objeto.

pip install mockito


## Stub ##
Ejemplo básico:
from mockito import mock, when

myMock = mock()

# Stub to return value
when(myMock).foo().thenReturn("bar")

print myMock.foo() # prints "bar"


## Spies ##
Nos dice si ha habido interacción con un método. O tal vez queremos lo contrario, ver que no hay interacción o que no hay a partir de un cierto momento:

Ejemplo:
from mockito import mock, when, verify

rex = mock()
when(rex).bark().thenReturn("wuff")

# Using stubbed method
print rex.bark()

# Verifying spied calls
verify(rex).bark()
