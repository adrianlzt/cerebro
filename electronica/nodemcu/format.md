# Format
file.format()
  borrar todos los ficheros subidos
  puede tardar un poco

# Estadisticas
r,u,t=file.fsinfo() print("Total : "..t.." bytes\r\nUsed  : "..u.." bytes\r\nRemain: "..r.." bytes\r\n") r=nil u=nil t=nil
  obtener datos de tamaño ocupado, etc


# Listar ficheros
l = file.list();
for k,v in pairs(l) do
  print("name:"..k..", size:"..v)
end
