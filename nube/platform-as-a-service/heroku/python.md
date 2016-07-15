https://devcenter.heroku.com/articles/getting-started-with-python#introduction
http://bottlepy.org/docs/dev/recipes.html#using-bottle-with-heroku

git clone https://github.com/guaq/heroku-in-a-bottle.git
cd heroku-in-a-bottle
heroku create NOMBRE --buildpack heroku/python --region eu

Subir codigo:
git add .
git commit -am "make it better"
git push heroku master

# Environ
def isDev():
    return os.environ.get('DYNO') == None

def isPro():
    return os.environ.get('DYNO') != None

