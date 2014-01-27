from django.conf.urls.defaults import *

urlpatterns = patterns('',
    (r'^$', 'qcAccess.views.index'),
)