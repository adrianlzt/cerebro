Hay tres tipos de scope para las credentials
 - system: disponible para el sistema de jenkins, por ejemplo si la necesitamos para acceder a un docker que levanta agentes
 - global: accesible para todos
 - user: accesibles para el user


Por defecto jobs jobs corren en el scope SYSTEM. Podemos instalar el plugin "Authorize project" para que corran como un usuario, de manera que tengan acceso a las credenciales de ese user
