http://julialang.org/downloads/

## Ubuntu ##
sudo add-apt-repository ppa:staticfloat/juliareleases
sudo apt-get update
sudo apt-get install -y julia

# Para tener la última nightly
sudo add-apt-repository ppa:staticfloat/julia-deps -y
sudo add-apt-repository ppa:staticfloat/julianightlies -y
sudo apt-get update -qq -y
sudo apt-get install git libpcre3-dev julia -y
