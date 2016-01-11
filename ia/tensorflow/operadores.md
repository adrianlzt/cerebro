# Argmax
Posicion en un tensor del elemento con mayor valor:
>>> sess.run(tf.argmax(tf.constant([[1, 2, 3, 5, 6, 3]]),1))
array([4])

Si le pasamos una matriz nos devuelve el indice del mayor elemento de cada fila:
>>> tf.argmax([[1,3,2],[5,3,3]],1).eval()
array([1, 0])




# Equal
Compara un array con otro y nos devuelve un array del mismo tamaño con True y False
>>> tf.equal([1,2,3,4],[1,3,5,4]).eval()
array([ True, False, False,  True], dtype=bool)
