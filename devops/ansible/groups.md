group_names, array con los nombres de los grupos a los que pertenece la máquina (sin el grupo all)
groups, diccionario con los grupos y las máquinas que contienen

ansible MAQUINA -m debug -a var=group_names
ansible MAQUINA -m debug -a var=groups

    "var": {
        "groups": {
            "all": [
                "localhost",
                "host-availzone3",
                "host-availzone2",
                "host-availzone1"
            ],
            "inet": [
                "host-availzone3",
                "host-availzone2",
                "host-availzone1"
            ],
            "localhost": [
                "localhost"
            ],
            "mgmt": [
                "host-availzone3",
                "host-availzone2",
                "host-availzone1"
            ]
        }
    }
