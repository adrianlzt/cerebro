https://pyflame.readthedocs.io/en/latest/
https://rivolaks.com/posts/profiling-python/

pacman -S pyflame flamegraph

pyflame -o profile.txt -x -t ./script.py -a 2 -b 3
flamegraph.pl <profile.txt >profile.svg
chromium profile.svg

Podemos intentar recortar los paths para poder verlos con mayor facilidad
cat flames.txt | sed -e 's#/usr/local/lib/python3../\(site\-packages/\)\?##g' | flamegraph.pl > flames.svg
