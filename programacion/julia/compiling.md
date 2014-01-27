# Mirar https://github.com/JuliaLang/julia/blob/master/.travis.yml
# https://travis-ci.org/JuliaLang/julia
# Mirando un job tenemos toda la secuencia de órdenes
#
# CUIDADO, en la máquina virtual, /home/julia corresponde con ../../ 
# Si usamos un git clone de todo el repo está pensando para que /home/julia sea el top del repo
#
Hacer fork del repo de git (si vamos a querer hacer modificaciones)

git clone .../adrianlzt/julia...

cd julia/contrib/vagrant

vagrant up

vagrant ssh

cd julia/

jlmake PREFIX=/tmp/julia install
