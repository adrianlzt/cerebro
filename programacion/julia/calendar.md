https://github.com/nolta/Calendar.jl

Competidor de DateTime.jl

Install
Pkg.add("Calendar")


julia> t = ymd_hms(2013, 3, 10, 1, 59, 59)
Mar 10, 2013 1:59:59 AM EST

julia> s = format("yyyy-MMMM-dd HH:mm:ss V", t)
"2013-March-10 01:59:59 EST"

julia> t2 = Calendar.parse("yyyy-MMMM-dd HH:mm:ss V", s)
Mar 10, 2013 1:59:59 AM EST

julia> t
May 2, 2013 1:45:07 PM PDT

julia> month(t)
5

julia> week(t)
18
