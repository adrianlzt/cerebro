RAM y Swap se agregan como memoria virtual y se divide en páginas.
Los procesos van reservando páginas y si no hay espacio o no se usan en un tiempo se llevan a swap (swap-out).
Si se reclama una página que está en swap, ocurre un fallo de página y se hace un swap-in (se devuelve a RAM)
