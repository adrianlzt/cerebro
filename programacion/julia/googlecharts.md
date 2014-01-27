https://github.com/jverzani/GoogleCharts.jl

Install:
Pkg.add("GoogleCharts")

Example (ejemplos en https://github.com/jverzani/GoogleCharts.jl/blob/master/test/tests.jl)
using Calendar, DataFrames, GoogleCharts
scatter_data = DataFrame(quote
    Age    = [8,  4,   11, 4, 3,   6.5]
    Weight = [12, 5.5, 14, 5, 3.5, 7  ]
end)

options = {:title => "Age vs. Weight comparison",
           :hAxis =>  {:title => "Age", 
                       :minValue => 0, 
                       :maxValue => 15},    
           :vAxis =>  {:title => "Weight", 
                       :minValue => 0, 
                       :maxValue => 15}
}

chart = scatter_chart(scatter_data, options);
render(chart)   ## displays in browser


# Tree Chart (solo puede haber un elemento raiz, "personas" en este caso)
tree_data = DataFrame(quote
Nombres = ["personas","jose","mari"]
Parent = [nothing,"personas","personas"]
"size" = [0,5,10]
"color" = [0,2,3] 
end)
chart=tree_chart(tree_data)


# Column chart
column_chart(DataFrame(quote
cosa = ["2001","2002","2003","2004"]
otra = [4,6,1,5]
end))
