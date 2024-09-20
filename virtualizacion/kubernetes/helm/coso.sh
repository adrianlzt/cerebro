res=$(kubectl get pods -o=jsonpath='{.items[*]..resources.limits.cpu}' -A)
let tot=0
for i in $res; do
  if [[ $i =~ "m" ]]; then
    i=$(echo $i | sed 's/[^0-9]*//g')
    tot=$((tot + i))
  else
    tot=$((tot + i * 1000))
  fi
done
echo $tot
