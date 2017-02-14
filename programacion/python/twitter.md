https://python-twitter.readthedocs.io/en/latest/twitter.html
https://github.com/bear/python-twitter/blob/master/examples/view_friends.py

https://apps.twitter.com/app/new
para obtener las credentials y token

pip install python-twitter


user = api.GetUser(screen_name="publico")

Obtener un tweet
t = api.GetUserTimeline(screen_name="publico",count=1)
t[0].text
