pstree
  arbol de procesos

pstree USUARIO
  arbol de procesos del usuario

pstree $(pgrep screen)
  arbol de procesos a partir de este proceso

pstree -H $(pgrep screen)
  arbol de procesos poniendo en negrita los parents y screen

pstree -p $(pgrep screen)
  te muetra los parents de screen, y los hijos de este

