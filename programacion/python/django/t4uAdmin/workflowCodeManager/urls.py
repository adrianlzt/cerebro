from django.conf.urls.defaults import *

urlpatterns = patterns('',
    #Fija
    (r'fija/$', 'workflowCodeManager.views.indexFija'),
    
    (r'fija/update_production_core/$', 'workflowCodeManager.views.update_productionFija'),
    (r'fija/update_production/$', 'workflowCodeManager.views.waitingWeb', {'nextFunc': "fija/update_production_core"} ),
    
    (r'fija/supplant/$', 'workflowCodeManager.views.waitingWeb', {'nextFunc': "fija/supplant_core"} ),
    (r'fija/supplant_core/$', 'workflowCodeManager.views.supplant'),
    
    (r'fija/end_supplant/$', 'workflowCodeManager.views.waitingWeb', {'nextFunc': "fija/end_supplant_core"} ),
    (r'fija/end_supplant_core/$', 'workflowCodeManager.views.end_supplant'),


    #Video
    (r'video/$', 'workflowCodeManager.views.indexVideo'),
    (r'video/new_release_core/$', 'workflowCodeManager.views.new_releaseVideo'),
    (r'video/new_release/$', 'workflowCodeManager.views.waitingWeb', {'nextFunc': "video/new_release_core"} ),
 
    (r'video/update_preproduction_core/$', 'workflowCodeManager.views.update_preproductionVideo'),
    (r'video/update_preproduction/$', 'workflowCodeManager.views.waitingWeb', {'nextFunc': "video/update_preproduction_core"} ),

    (r'video/latest_logs/$', 'workflowCodeManager.views.latest_logsVideo'),
    
    (r'video/videoSync/$', 'workflowCodeManager.views.videoSync'),

    (r'video/synchronizeVideo_core/$', 'workflowCodeManager.views.synchronizeVideo'),
    (r'video/synchronizeVideo/$', 'workflowCodeManager.views.waitingWeb', {'nextFunc': "video/synchronizeVideo_core"} ),                   


    #Manufacturers
    (r'^$', 'workflowCodeManager.views.index'),
	
	(r'update_preproduction_core/$', 'workflowCodeManager.views.update_preproduction'),
	(r'update_preproduction/$', 'workflowCodeManager.views.waitingWeb', {'nextFunc': "update_preproduction_core"} ),
	
	(r'update_learning_core/$', 'workflowCodeManager.views.update_learning'),
	(r'update_learning/$', 'workflowCodeManager.views.waitingWeb', {'nextFunc': "update_learning_core"} ),
	
	(r'new_release_core/$', 'workflowCodeManager.views.new_release'),
	(r'new_release/$', 'workflowCodeManager.views.waitingWeb', {'nextFunc': "new_release_core"} ),
	
	(r'latest_logs/$', 'workflowCodeManager.views.latest_logs'),
	
	(r'manufacturerSync/$', 'workflowCodeManager.views.manufacturerSync'),

	(r'synchronizeManufacturers_core/$', 'workflowCodeManager.views.synchronizeManufacturers'),
	(r'synchronizeManufacturers/$', 'workflowCodeManager.views.waitingWeb', {'nextFunc': "synchronizeManufacturers_core"} ),
	(r'denied/$', 'workflowCodeManager.views.denied'),
	
	(r'sendDummyMail/$', 'workflowCodeManager.views.sendDummyMail'),
	(r'emailsT4U/$', 'workflowCodeManager.views.emailsT4U'),
	(r'emailsKhepera/$', 'workflowCodeManager.views.emailsKhepera'),
	
	(r'newKoalaUser/$', 'workflowCodeManager.views.newKoala2User'),
)