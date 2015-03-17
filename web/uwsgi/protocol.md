http://uwsgi-docs.readthedocs.org/en/latest/Protocol.html

# Header
struct uwsgi_packet_header {
    uint8_t modifier1;
    uint16_t datasize;
    uint8_t modifier2;
};

00 98 01 00
modifier1 = 0 (size of WSGI block vars (HTTP request body excluded))
datasize = 0x198 = 408
modifier2 = 00

# Vars
struct uwsgi_var {
    uint16_t key_size;
    uint8_t key[key_size];
    uint16_t val_size;
    uint8_t val[val_size];
}

0E 00 52 45 51 55 45 53 54 5F 4D 45 54 48 4F 44 03 00 47 45 54
      R  E  Q  U  E  S  T  _   M  E  T  H O  D         G  E  T

0E 00 -> little endian -> 000E -> 14 caracteres

03 00 -> little endian -< 0003 -> 3 caracteres



Ejemplo atacando directamente al socket uwsgi:
cat query_example.hex | xxd -r -p | nc 127.0.0.1 3031
cat query_example.hex | xxd -r -p | nc -U /var/run/uwsgi.sock
