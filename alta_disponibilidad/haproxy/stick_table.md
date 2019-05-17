Stick tables allow keeping track of arbitrary client information across requests, so they are used for purposes such as creating “sticky” sessions, implementing security protections, setting limits, and maintaining counters and lists.

Ejemplo para limitar peticiones. Max 5req/s y bloqueado 15' si durante 10s supera la media de 5req/s

frontend ft_web
    bind 0.0.0.0:8080

    # Stick table definition
    # Almacenamos la tabla 15minutos
    # Puede contener hasta 1 millon de entradas
    # Almacena la ip, el req_rate de los últimos 10s y un valor (gpt0), que se pondrá a 1 si queremos bloquear al usuario
    stick-table type ip size 1m expire 15m store gpt0,http_req_rate(10s)

    # Permitimos acceso directo a la whitelist (sin limites)
    http-request allow if { src -f /etc/hapee/whitelist.lst }

    # ?
    http-request track-sc0 src

    # Limitamos a 5 req/s
    acl abuse src_http_req_rate ge 5

    # ?
    http-request sc-set-gpt0(0) 1 if abuse
    http-request deny if { sc0_get_gpt0 ge 1 }
