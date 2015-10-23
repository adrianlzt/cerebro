rm array_perf set_perf dict_perf
for i in array_*.json; do ./performance.py $i >> array_perf; done
for i in array_*.json; do ./performance.py $i set >> set_perf; done
for i in diccionario_*.json; do ./performance.py $i >> dict_perf; done
cat array_perf set_perf dict_perf
