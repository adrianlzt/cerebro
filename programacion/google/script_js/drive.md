https://developers.google.com/apps-script/reference/drive/

# Crear directorio debajo de otro directorio
dir = DriveApp.getFolderById("08N1ohXVhF0uE2E");
dir.createFolder("pruebaNueva")

# Comprobar que existe un dir
DriveApp.getFoldersByName("JAcobo Garcia - jaco@garc.om").hasNext()

# Ficheros
direc.addFile(fichero)
Pone el fichero en los dos sitios al mismo tiempo (https://developers.google.com/apps-script/reference/drive/folder#addfilechild)

Si queremos copiarlo:
fichero.makeCopy(direc)

// Un fichero puede estar simultaneamente en varios directorios
// Esta funcion lo saca de todos los directorios donde estuviese y lo pone en dir
function mv(file, dir) {
  folders = file.getParents()
  while (folders.hasNext()) {
    parent = folders.next();
    parent.removeFile(file)
  }
  dir.addFile(file);
}
