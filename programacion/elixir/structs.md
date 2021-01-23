defmodule Person do
  defstruct name: nil, age: 0, height: 0
end

joe_info = %Person{ name: "Joe", age: 30, height: 180 }

joe_info.name #=> "Joe"


Copiar el contenido de joe_info a older_joe_info modificando la key "older"
older_joe_info = %{ joe_info | age: 31 }

