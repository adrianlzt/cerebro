Definir nuestra API siguiendo un standar para que después la doc se genere sola.
También nos da herramientas para poder crear un cliente facilmente.

Ejemplo: https://simswapapi.jetsetme.com/jsmsdoc/

Integraciones:
http://swagger.io/open-source-integrations/

Ejemplo:
http://editor.swagger.io/#/

La mayoria de los frameworks te puede autogenerar la doc

Generalmente se define un YAML donde explicamos que hace la API:
paths:
  /pets:
    get:
      description: Returns all pets from the system that the user has access to
      operationId: findPets
      produces:
        - application/json
        - application/xml
        - text/xml
        - text/html
      parameters:
        - name: tags
          in: query
          description: tags to filter by
          required: false
          type: array
          items:
            type: string
...
