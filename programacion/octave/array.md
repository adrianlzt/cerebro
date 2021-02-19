https://octave.org/doc/v4.2.2/Basic-Usage-of-Cell-Arrays.html#Basic-Usage-of-Cell-Arrays

c = {"a string", rand(2, 2)};
c{1}

Buscar una cadena en un array:
strcmp(vocabList, "zip")
  nos devuelve 0 en cada posición donde no encuentre la palabra y 1 donde la encuentre
