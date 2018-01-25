{
  "adritest": {
    "order": 0,  // Orden el que se aplica la template
    "template": "adri*",  // Sobre que indices aplica
    "settings": {
      "index": {  // Settings del indice, en este caso que pueda tener hasta 10000 fields (por defecto creo que son 2000)
        "mapping": {
          "total_fields": {
            "limit": "10000"
          }
        },
        "refresh_interval": "5s"  // Cada cuanto timpo se chequea si ya hay sincro en el cluster para exponer los datos a la búsqueda
      }
    },
    "mappings": {
      "_default_": {  // Para todos los doc types?
        "_all": {
          "norms": false
        },
        "_meta": {
          "version": "5.2.2"
        },
        "dynamic_templates": [
          {
            "strings_as_keyword": {  // Si encuentra una string la formatea como keyword
              "mapping": {
                "ignore_above": 1024,
                "type": "keyword"
              },
              "match_mapping_type": "string"
            }
          }
        ],
        "properties": {
          "@timestamp": {  // El field @timestamp es un tipo fecha
            "type": "date"
          },
          "ansible_facts": {  // ansible_facts.ansible_python.version_info tratarlo como keyword
            "properties": {
              "ansible_python": {
                "properties": {
                  "version_info": {
                    "ignore_above": 1024,
                    "type": "keyword"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
