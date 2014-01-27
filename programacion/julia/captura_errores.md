try
    a[0] #=> ERROR: BoundsError() in getindex at array.jl:270
    a[end+1] #=> ERROR: BoundsError() in getindex at array.jl:270
catch e
    println(e)
end

# Errors list the line and file they came from, even if it's in the standard
# library. If you built Julia from source, you can look in the folder base
# inside the julia folder to find these files.

