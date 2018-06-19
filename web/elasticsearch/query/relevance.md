# Conceptos

Precision: estamos teniendo resultados irrelevantes?
  ratio de true positives vs número total de documentos devueltos
  mejorable haciendo las queries retornen solo match exacts, pero hace el recall peor

Recall: estamos perdiendo documentos relevantes
  ratio de true positives vs número total de the documentos que deberían haber retornado (true positives + false negatives)
  la podemos mejorar usando queries que devuelven resultados parciales o similares, pero hace la precisión peor

Ranking: los documentos estan ordenados con el más relevante arriba?


true negatives: documentos que no queremos devolver y que no son devueltos
true positivos: documentos que queremos devolver y son devueltos
false negatives: documentos que no queremos devolver y que si son devueltos
false positivos: documentos que queremos devolver pero no son devueltos

positivos: resultados devueltos
negatives: resultados no devueltos

true: documentos que queremos
false: documentos que no queremos
