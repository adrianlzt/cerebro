IN="una;otra;mas;y;otra"
while IFS=';' read -ra ADDR; do
      for i in "${ADDR[@]}"; do
          echo $i
      done
done <<< "$IN"
