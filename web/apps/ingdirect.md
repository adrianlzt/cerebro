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


# Mi notificador
github.com:adrianlzt/notificador-ing
~/Documentos/ingdirect/banco-heroku

Si deja de funcionar, entrar en la url para que vuelva a funcionar.


# Como funciona el simulador de hipotecas (junio 2026)

Cómo funciona el sistema de precios de hipotecas de ING

El proceso en 3 pasos

1. ING decide qué TIN (tipo de interés nominal) te aplica según tus características
2. Calcula la cuota mensual con la fórmula de amortización francesa (la misma que usa todo el sector)
3. Aplica bonificaciones si traes nómina, seguro de hogar y seguro de vida

---

1. El importe del préstamo es lo que más afecta

Con todo lo demás fijo, cambiando solo el préstamo:

100.000€
• TIN Fijo: 3,75% ← más barato

150.000€
• TIN Fijo: 3,75%

200.000€
• TIN Fijo: 3,75%

250.000€
• TIN Fijo: 4,10% ← salta

300.000€
• TIN Fijo: 4,25%

350.000€
• TIN Fijo: 4,25%

ING tiene tramos por importe. Pedir 200k vs 300k te cambia el TIN en 0,50 puntos. Son ~50€/mes menos.

---

2. Tus ingresos también importan

Con préstamo de 300k fijo:

1.500€
• TIN Fijo: 4,50%

3.000€
• TIN Fijo: 4,50%

5.000€
• TIN Fijo: 4,35%

8.000€
• TIN Fijo: 4,25% ← a partir de aquí no mejora más

A más ingresos, menos riesgo → mejor tipo.

---

3. Cada provincia tiene su propio precio

Bizkaia (48)
• TIN Fijo: 4,10%
• Cuota (300k, 25a): 1.600€

Madrid (28)
• TIN Fijo: 4,15%
• Cuota (300k, 25a): 1.608€

Albacete (02)
• TIN Fijo: 4,20%
• Cuota (300k, 25a): 1.617€

A Coruña (15)
• TIN Fijo: 4,20%
• Cuota (300k, 25a): 1.617€

Cantabria (39)
• TIN Fijo: 4,25%
• Cuota (300k, 25a): 1.625€

Valencia (46)
• TIN Fijo: 4,25%
• Cuota (300k, 25a): 1.625€

Barcelona (08)
• TIN Fijo: 4,30%
• Cuota (300k, 25a): 1.634€

Diferencia de hasta 0,20pp entre provincias. ING segmenta por riesgo inmobiliario regional.

---

4. Cosas que NO afectan al TIN

- Edad (de 20 a 65 años da igual —el TIN es el mismo)
- Plazo (10, 15, 20, 25 o 30 años → mismo TIN, cambia solo la cuota)
- LTV (pedir 40% u 80% del valor de la casa → mismo TIN)
- Uno o dos titulares (con mismos ingresos totales da igual)

---

5. Lo que más te interesa: la bonificación por productos

Esta es la clave para ahorrar. El descuento es fijo: 0,40pp en el TIN por traer nómina + seguro de hogar + seguro de vida.

En tu caso (300k, 25 años):

Solo nómina
• TIN Fijo: 4,65%
• Cuota: 1.693€

Nómina + hogar
• TIN Fijo: 4,55%
• Cuota: 1.676€

Nómina + hogar + vida
• TIN Fijo: 4,25%
• Cuota: 1.625€

La diferencia entre tener todos los productos o ninguno son 68€/mes, que en 25 años son ~20.000€ de intereses.

---

6. La fórmula de la cuota (confirmado experimentalmente)

Se cumple exactamente la fórmula del sistema francés:

Cuota = P × r × (1+r)^n / [(1+r)^n - 1]

P = préstamo (300.000€)
r = TIN / 12 (4,25% / 12 = 0,3542% mensual)
n = plazo × 12 (25 × 12 = 300 meses)

Ejemplo verificado: Fijo 4,25%, 300k, 25a → 1.625,21€/mes (exacto, error < 0,01€)

---

7. Productos disponibles

- TINI (Variable): 36 meses al 2,65%, luego euríbor + 1,51pp → cuota variable ~1.590€
- MIX (Mixta): 60 meses al 2,75%, luego variable → cuota fija 1.384€
- FIX (Fija): Toda la vida al 4,25% → cuota 1.625€

 En TINI y MIX la cuota fija inicial se calcula amortizando a 300 meses enteros (plazo completo), no solo al periodo fijo. Por eso la cuota del TINI (1.368€) es más baja que la del variable posterior (1.590€).

---

¿Qué quieres hacer ahora? ¿Automatizar algo con esta información? Por ejemplo, podría crear un script que:
- Te pida tus datos y calcule al instante qué hipoteca te daría ING
- Compare varias combinaciones de parámetros
- Haga seguimiento del euríbor para saber cuándo se actualiza tu cuota variable
