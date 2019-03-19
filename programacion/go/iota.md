https://golang.org/ref/spec#Iota

Para declarar constantes con valores 1, 2, 3 (u 1, 2, 4, 8)


const ( // iota is reset to 0
  c0 = iota  // c0 == 0
  c1 = iota  // c1 == 1
  c2 = iota  // c2 == 2
)


// Equivalente y más compacto
const (
  c0 = iota
  c1
  c2
  c3
)

Si queremos usarla varias veces
const (
  xx = iota
  bb
  cc
)

const (
  aa = iota
  mm
)
