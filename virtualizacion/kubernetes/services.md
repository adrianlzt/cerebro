https://kubernetes.io/docs/concepts/services-networking/service/

Es la abstracción por encima de los PODs para que otros PODs puedan usar a los primeros.
Ejemplo, un backend que es accedido por un frontend.

El service decidirá a que pods ataca según un selector (una label con un valor).









# Template
kind: Service
apiVersion: v1
metadata:
  name: my-service
spec:
  selector:
    app: MyApp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376
