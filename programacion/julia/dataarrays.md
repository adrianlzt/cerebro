https://github.com/JuliaStats/DataArrays.jl

The DataArrays package extends Julia by introducing data structures that can contain missing data. In particular, the package introduces three new data types to Julia:

NA: A singleton type that represents a single missing value.

DataArray{T}: An array-like data structure that can contain values of type T, but can also contain missing values.

PooledDataArray{T}: A variant of DataArray{T} optimized for representing arrays that contain many repetitions of a small number of unique values -- as commonly occurs when working with categorical data.

Install
Pkg.add("DataArrays")
