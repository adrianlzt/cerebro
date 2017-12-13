Mapping para poder indexar un json de los facts de ansible (tiene un array con números y strings que por defecto no se lo traga)
PUT adriinv/
{
    "mappings": {
      "_default_": {
        "_all": {
          "norms": false
        },
        "_meta": {
          "version": "5.2.2"
        },
        "dynamic_templates": [
          {
            "strings_as_keyword": {
              "mapping": {
                "ignore_above": 1024,
                "type": "keyword"
              },
              "match_mapping_type": "string"
            }
          }
        ],
        "properties": {
          "@timestamp": {
            "type": "date"
          },
          "ansible_facts": {
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
          },
          "version_info": {
            "ignore_above": 1024,
            "type": "keyword"
          }
        }
      }
    },
    "aliases": {}
}
