https://pyflame.readthedocs.io/en/latest/
https://rivolaks.com/posts/profiling-python/

pacman -S pyflame flamegraph

pyflame -o profile.txt -x -t ./script.py -a 2 -b 3
flamegraph.pl <profile.txt >profile.svg
chromium profile.svg

Podemos intentar recortar los paths para poder verlos con mayor facilidad
sed -i "s#/home/adrian/.virtualenvs/cma-c0B6vGIT/lib/python3.6/##g" profile.txt
