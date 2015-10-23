PERF=dict_import_perf
test -e $PERF && rm $PERF

for i in diccionario*_json.py; do
  data=$(echo $i | cut -d '.' -f 1)
  /usr/bin/time -ao $PERF -f "$i: %e" ./performance_full_import.py $data
done

for i in diccionario*_json_literales.py; do
  data=$(echo $i | cut -d '.' -f 1)
  /usr/bin/time -ao $PERF -f "$i: %e" ./performance_full_import.py $data
done

cat $PERF
