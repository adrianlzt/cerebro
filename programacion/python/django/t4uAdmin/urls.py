from django.conf.urls.defaults import *
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
	(r'^svn/', include('workflowCodeManager.urls')),
	#(r'^t4u/', include('qcAccess.urls')),
    (r'^admin/', include(admin.site.urls)),
	(r'^accounts/login/$', 'django.contrib.auth.views.login'),
	(r'^accounts/logout/$', 'django.contrib.auth.views.logout', {'template_name': 'workflowCodeManager/logout.html'}),
)

urlpatterns += staticfiles_urlpatterns()