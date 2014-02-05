Nos genera una tabla con los campos que definamos:

sourcetype="linux" | sort -src_ip | table user src_ip
