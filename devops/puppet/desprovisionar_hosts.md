for i in nodo1 nodo2 nodo3; do
puppet node deactivate $i
puppet node clean $i
done
