#!/usr/bin/env ruby

class MegaAnfitrion
  attr_accessor :nombres

  # Crear el objeto
  def initialize(nombres = "Mundo")
    @nombres = nombres
  end

  # Decirle hola a todos
  def decir_hola
    if @nombres.nil?
      puts "..."
    elsif @nombres.respond_to?("each")
      # @nombres es una lista de algún tipo,
      # ¡así que podemos iterar!
      @nombres.each do |nombre|
        puts "Hola #{nombre}"
      end
    else
      puts "Hola #{@nombres}"
    end
  end

  # Decirle adiós a todos
  def decir_adios
    if @nombres.nil?
      puts "..."
    elsif @nombres.respond_to?("join")
      # Juntar los elementos de la lista
      # usando la coma como separador
      puts "Adis #{@nombres.join(", ")}. Vuelvan pronto."
    else
      puts "Adis #{@nombres}. Vuelve pronto."
    end
  end

end


if __FILE__ == $0
  ma = MegaAnfitrion.new
  ma.decir_hola
  ma.decir_adios

  # Cambiar el nombre a "Diego"
  ma.nombres = "Diego"
  ma.decir_hola
  ma.decir_adios

  # Cambiar el nombre a un vector de nombres
  ma.nombres = ["Alberto", "Beatriz", "Carlos",
    "David", "Ernesto"]
  ma.decir_hola
  ma.decir_adios

  # Cambiarlo a nil
  ma.nombres = nil
  ma.decir_hola
  ma.decir_adios
end
