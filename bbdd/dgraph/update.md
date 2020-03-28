Para actualizar realizaremos un "mutate" especificando el uid a modificar:

{
  "set":[
    {
      "uid": "MICHAELS_UID",
      "age": 41
    }
  ]
}


Ejemplo añadiendo un edge:
{
  "set":[
    {
      "uid": "LEYLAS_UID",
      "follows": {
        "uid": "MICHAELS_UID"
      }
    }
  ]
}



# Upsert
https://docs.dgraph.io/master/mutations/#upsert-block

Selecionamos primero un uid con una búsqueda y luego le aplicamos un mutation

upsert {
  query {
    q(func: eq(triggerid, 3237853)) {
      Parent as uid
    }
  }
  mutation {
    set {
      uid(Parent) <host> "lp1orb03..oracle__ASM_mutado" .
    }
  }
}


Crear una dependencia, obteniendo primero los UIDs con dos queries distintas:
upsert {
  query {
    q(func: eq(triggerid, 3237853)) {
      Parent as uid
    }
    q2(func: eq(triggerid, 2269659)) {
      Child as uid
    }
  }
  mutation {
    set {
      uid(Parent) <depends_on> uid(Child) .
    }
  }
}

En formato JSON
{
    "query": "{q(func: eq(triggerid, 2269659)) { Parent as uid } \n q2(func: eq(triggerid, 1885327)) { Child as uid }}",
    "set": [
        {
            "uid": "uid(Parent)",
            "depends_on": {
                "uid": "uid(Child)"
              }
         }
    ]
}



## Conditionals upserts
https://docs.dgraph.io/master/mutations/#conditional-upsert

upsert {
  query {
    v as var(func: regexp(email, /.*@company1.io$/))
  }

  mutation @if(lt(len(v), 100) AND gt(len(v), 50)) {
    delete {
      uid(v) <name> * .
      uid(v) <email> * .
      uid(v) <age> * .
    }
  }
}

