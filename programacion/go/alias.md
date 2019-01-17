https://stackoverflow.com/a/28800807

Una forma de poder definir nuevos métodos para un type de otro paquete:

type MyRouter mux.Router

func (m *MyRouter) F() { ... }


El problema es que no heredamos sus métodos (aunque si sus atributos).

Mirar embedding.md para poder heredar métodos.
