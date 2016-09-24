https://kataras.gitbooks.io/iris/content/named-parameters.html


iris.Get("/hello/:name", func(c *iris.Context) {
        // Retrieve the parameter name
        name := c.Param("name")
        c.Write("Hello %s", name)
    })

