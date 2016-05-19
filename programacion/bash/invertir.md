!

Si queremos por ejemplo ejecutar un while mientras no encuentre el grep:

while $(! ip -4 -o a | grep -q wlo1)  ; do echo "yes"; sleep 1; done
