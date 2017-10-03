E: El valor «stable» no es válido para APT::Default-Release ya que dicha distribución no está disponible en las fuentes
E: The value 'stable' is invalid for APT::Default-Release as such a release is not available in the sources

vi /etc/apt/apt.conf.d/99defaultrelease

La version "stable" ha cambiado.
O ponemos "oldstable" o el nombre de la versión que estemos usando, o actualizamos a la ultima stable.
