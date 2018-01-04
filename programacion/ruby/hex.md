Siendo payload una string, obtener su valor en caracteres hex tipo 0A
line = payload.bytes.map { |b| sprintf(", %02X",b) }.join

