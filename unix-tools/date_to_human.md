systemd-analyze timespan 1s 300s '1year 0.000001s'

Usar systemd-analyze para convertir fechas a "human readable".


➜ systemd-analyze timespan '102s 74s 44s 36s' '79min 42s'
Original: 102s 74s 44s 36s
      μs: 256000000
   Human: 4min 16s

Original: 79min 42s
      μs: 4782000000
   Human: 1h 19min 42s
