#!/bin/bash
echo "Obtiene 10 muestras cada 2 segundos"
echo "date nr_free_pages nr_alloc_batch nr_inactive_anon" > data
for i in {1..10}; do
sleep 1
date +%s | tr '\n' ' ' >> data
cat /proc/vmstat | grep -e nr_free_pages -e nr_alloc -e nr_inactive_anon | cut -d ' ' -f 2 | tr '\n' ' ' >> data
echo "" >> data
done


