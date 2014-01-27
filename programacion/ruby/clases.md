class BlogEntry
  attr_accessor :title, :time, :fulltext, :mood
end

Crea accessors (getter y setters) para esas variables (que soy 

Las variables internas de la clase se llaman variables de instancia (instance variables)

class BlogEntry
  def initialize( title, mood, fulltext )
    @time = Time.now
    @title, @mood, @fulltext = title, mood, fulltext
  end
end
> b = BlogEntry.new "titulo", :loquesea, "esto es el fulltext"
