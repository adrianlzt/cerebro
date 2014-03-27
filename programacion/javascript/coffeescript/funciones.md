ping = ->
    console.log "Pinged"

# Para llamar a la función
ping()



# Parámetros #
ping = (msj) ->
  alert "Hello CoffeeScript! " + msj

ping('pepe')


# Splat parámetros #
#Pasar un número indeterminado de parámetros
loadTruck = (firstDibs, secondDibs, tooSlow..., leftAtHome) ->
    truck:
        driversSeat: firstDibs
        passengerSeat: secondDibs
        trunkBed: tooSlow
    taxi:
        passengerSeat: leftAtHome

loadTruck("Amanda", "Joel", "Bob", "Mary", "Phillip", "Austin")
# => { truck: { driversSeat: 'Amanda', passengerSeat: 'Joel', trunkBed: [ 'Bob', 'Mary', 'Phillip' ] }, taxi: { passengerSeat: 'Austin' } }

