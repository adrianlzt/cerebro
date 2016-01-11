# Many-to-one
https://docs.djangoproject.com/en/1.8/topics/db/examples/many_to_one/

class Reporter(models.Model):
    first_name = models.CharField(max_length=30)

class Article(models.Model):
    reporter = models.ForeignKey(Reporter)


# Many-to-many
https://docs.djangoproject.com/en/1.8/topics/db/examples/many_to_many/

Ejemplo, agregamos varios articulos a una publicacion.


class Publication(models.Model):
    title = models.CharField(max_length=30)

class Article(models.Model):
    headline = models.CharField(max_length=100)
    publications = models.ManyToManyField(Publication)


>>> a1 = Article(headline='Django lets you build Web apps easily')
>>> a1.save()
>>> a1.publications.add(p1)

