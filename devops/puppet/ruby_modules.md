Crear módulos para hacer cosas como crear defined types usando hiera como ENC: http://blog.yo61.com/assigning-resources-to-nodes-with-hiera-in-puppet/

Para meter lineas de debug:

debug "hiera_resources: nombre param: #{args}"

Para sacar errores:
raise Puppet::Error, "hiera_resources requires 1 argument; got #{args.length}"
