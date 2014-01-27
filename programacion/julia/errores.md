ERROR: no method __c11#48__(Bool,Array{Union(UTF8String,ASCIIString),1},Int64,Array{ASCIIString,1})

Funcion que daba error si la ejecutamos con:
bytestotype(Bool,Uint8[1],1,1,[""])
function bytestotype{N <: Bool, T <: ByteString}(::Type{N},
                                                 bytes::Vector{Uint8},
                                                 left::Int,
                                                 right::Int,
                                                 nastrings::Vector{T};                      
                                                 wasquoted::Bool=false,
                                                 truestrings::Vector{T}=[],
                                                 falsestrings::Vector{T}=[])

El problema es que el typo 'T' es vacío para los truestrings y falsestrings, y no concuerda con el tipo 'T' de nastrings que es String.

La función arreglada:
function bytestotype{N <: Bool, T <: ByteString, P <: ByteString}(::Type{N},
                                                                  bytes::Vector{Uint8},
                                                                  left::Int,
                                                                  right::Int,
                                                                  nastrings::Vector{T};                      
                                                                  wasquoted::Bool=false,
                                                                  truestrings::Vector{P}=[],
                                                                  falsestrings::Vector{P}=[])

