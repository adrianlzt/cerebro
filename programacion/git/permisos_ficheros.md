Git doesn't really store the full mode of the file. It really only cares about one single bit, the x (executable) bit. If the x bit is on, git says that a file is mode 100755. If the x bit is off, git says that the same file is now mode 100644

El bit importante es el de ejecución del usuario, el resto dan igual.

Quitar seguir los permisos
http://www.f15ijp.com/2012/08/git-diff-old-mode-100755-new-mode-100644/
