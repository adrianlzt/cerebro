#for i in 100 1000 10000 100000 1000000 10000000; do ./generator.py $i; done

for i in dicc*.json; do
  filename=$(echo $i | tr '.' '_')
  cat $i | sed "s/true/True/g" | sed "s/^/HOSTS=/" > $filename.py
  cat $i | sed "s/true/True/g" | sed "s/^/HOSTS=/" | sed s/'"'/"'"/g > ${filename}_literales.py
done
