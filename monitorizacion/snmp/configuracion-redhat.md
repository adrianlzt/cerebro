Configuración que hay que habilitar a la que viene por defecto para permitir leer todo desde localhost:
com2sec local     localhost       grupo
group MyRWGroup  any        local
view all    included  .1                               80
access MyRWGroup ""      any       noauth    0      all    all    all

