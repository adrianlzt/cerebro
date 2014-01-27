from django.db import models

class LearningProyect(models.Model):
	name = models.CharField(max_length=50)
	path = models.CharField(max_length=200, help_text="E.g.: Take care to not put white spaces in the beginning or the end of the path")
	active = models.BooleanField(default=True, help_text="Non active proyects will not be updated")
	def __unicode__(self):
		return self.name
		
class Proyect(models.Model):
	name = models.CharField(max_length=50)
	path = models.CharField(max_length=200, help_text="E.g.: Take care to not put white spaces in the beginning or the end of the path")
	active = models.BooleanField(default=True, help_text="Non active proyects will not be updated")
	def __unicode__(self):
		return self.name
		
class Draft(models.Model):
	name = models.CharField(max_length=50, help_text="2011Q2")
	path = models.CharField(max_length=200, help_text="E.g.: Take care to not put white spaces in the beginning or the end of the path")
	active = models.BooleanField(default=True, help_text="Non draft proyects must be set to False")
	def __unicode__(self):
		return self.name
		
class PreproductionProyect(models.Model):
	name = models.CharField(max_length=50)
	path = models.CharField(max_length=200, help_text="E.g.: Take care to not put white spaces in the beginning or the end of the path")
	active = models.BooleanField(default=True, help_text="Non active proyects will not be updated")
	def __unicode__(self):
		return self.name
	
class VideoProyect(models.Model):
	name = models.CharField(max_length=50)
	path = models.CharField(max_length=200, help_text="E.g.: Take care to not put white spaces in the beginning or the end of the path")
	active = models.BooleanField(default=True, help_text="Non active proyects will not be updated")
	
	PROYECT_CHOICE = (
        (u'preproduction', u'Preproduction'),
        (u'production', u'Production'),
    )
	kind = models.CharField(max_length=20,choices=PROYECT_CHOICE)
	def __unicode__(self):
		return self.name

class FijaProyect(models.Model):
    name = models.CharField(max_length=50)
    path = models.CharField(max_length=200, help_text="E.g.: Take care to not put white spaces in the beginning or the end of the path")
    active = models.BooleanField(default=True, help_text="Non active proyects will not be updated")
    def __unicode__(self):
        return self.name
