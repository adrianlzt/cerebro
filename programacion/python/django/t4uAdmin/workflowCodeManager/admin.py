from workflowCodeManager.models import Proyect,LearningProyect,Draft,PreproductionProyect,VideoProyect,FijaProyect
from django.contrib import admin

class ProyectAdmin(admin.ModelAdmin):
    list_display = ('name', 'path', 'active')
	
class LearningProyectAdmin(admin.ModelAdmin):
    list_display = ('name', 'path', 'active')

class DraftAdmin(admin.ModelAdmin):
    list_display = ('name', 'path', 'active')
	
class PreproductionProyectAdmin(admin.ModelAdmin):
    list_display = ('name', 'path', 'active')
    
class VideoProyectAdmin(admin.ModelAdmin):
    list_display = ('name', 'path', 'kind', 'active')

class FijaProyectAdmin(admin.ModelAdmin):
    list_display = ('name', 'path', 'active')

admin.site.register(Proyect, ProyectAdmin)
admin.site.register(LearningProyect, LearningProyectAdmin)
admin.site.register(Draft, DraftAdmin)
admin.site.register(PreproductionProyect, PreproductionProyectAdmin)
admin.site.register(VideoProyect, VideoProyectAdmin)
admin.site.register(FijaProyect, FijaProyectAdmin)