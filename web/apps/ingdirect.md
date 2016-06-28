https://github.com/bankscrap/bankscrap

Gema para consultar saldo y movimientos de varios bancos, entre ellos, ING-Direct

Con variables de entorno:
BANKSCRAP_ING_DNI=00000000p BANKSCRAP_ING_PASSWORD=000000 BANKSCRAP_ING_BIRTHDAY=00/00/1980 bankscrap transactions ING

bankscrap transactions ING --credentials=dni:000000p password:000000 birthday:00/00/1980


Como lib:
irb
require 'bankscrap-ing'
ing = Bankscrap::ING::Bank.new(dni: "0000000p", password: "000000", birthday:"00/00/1980")
ing.accounts.first.balance
