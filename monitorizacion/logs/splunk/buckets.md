Index types:
 Hot: most recent events, several buckets, read and write
   ---> pasa por política por política de bucket, reinicio de splunk o forzado manualmente
 Warm: next step aging process, several buckets, read-only
   ---> pasa por tamaño
 Cold: final step aging process, several buckets, read-only
   ---> no se pasa a thawed
 Thawed: file restore, read-only
   Este bucket es para meter cosas manuales, podemos meter buckets, y decir a splunk que mire estos buckets.
   Estos buckets serán datos que tenemos en backup fuera de splunk y que por alguna razón necesitamos mirar.

Bucket:
 Logical groups based on time values
 Splunk periodically executes optimization processes on buckets
 Buckets (files) are rotated, volume defined
