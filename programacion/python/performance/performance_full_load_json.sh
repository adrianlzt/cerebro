rm dict_load_json_perf

for i in diccionario_*.json; do
  /usr/bin/time -ao dict_load_json_perf -f "$i: %e" ./performance_full_load_json.py $i
done

cat dict_load_json_perf
