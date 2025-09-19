Esperar a que terminen los programas en segundo plano

sleep 5 &
wait

Si queremos esperar por otro PID

```bash
TARGET_PID=662307; while kill -0 "$TARGET_PID" 2>/dev/null; do sleep 5; done; echo "fin"
```

Otra opción:

```bash
while kill -0 $(pgrep -f foo) 2>/dev/null; do sleep 5; done; echo "fin"
```
