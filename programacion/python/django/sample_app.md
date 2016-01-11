https://github.com/kirpit/django-sample-app

git clone https://github.com/kirpit/django-sample-app.git
cd django-sample-app
pip install -r requirements.txt
sed -i s/"{{ project_name }}"/"projectname"/ projectname/wsgi.py
sed -i s/'!!! paste your own secret key here !!!'/"XXXXXXXXXXXXXXXXXXX"/ projectname/settings/default.py
sed -i s/"{{ project_name }}"/projectname/ projectname/urls.py
sed -i s/"{{ project_name }}"/projectname/ projectname/settings/default.py
cp projectname/settings/local.template.py projectname/settings/local.py
sed -i s/"django.db.backends.postgresql_psycopg2"/"django.db.backends.sqlite3"/ projectname/settings/local.py
projectname/./manage.py migrate



Si queremos poner esta app en GAE tendremos que quitar todas las referencias a "compress" porque usan ficheros locales no soportados por GAE.
