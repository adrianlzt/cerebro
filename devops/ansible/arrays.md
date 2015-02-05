  - name: prueba
    command: echo -e "group_a_master_ci_3:27017\npepe\ncosa"
    register: prueba

  - debug: var=prueba.stdout_lines.1
Esto devuelve solo la primera linea

.index('pepe') nos devuelve la posicion donde esté ese elemento




ok: [127.0.0.1] => {
    "prueba.stdout_lines": [
        "group_a_master_ci_3:27017", 
        "pepe", 
        "cosa"
    ]
}

