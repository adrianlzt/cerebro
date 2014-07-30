Leer un fichero y convertir las líneas tipo "Clave: valor" en un hash.

data = {}

ARGF.each do |line|
  if line =~ /^[a-zA-Z]+: .*/
    data.merge!({line.split(": ").first => line.split(": ").last.strip})
  end
end
pp data

