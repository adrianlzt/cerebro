import platform
print platform.node()
  nos da el nombre con dominio (si lo tiene): pepe.local

platform.node().split('.', 1)[0]
  para coger solo el hostname, sin domainname
