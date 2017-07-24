http://bottlepy.org/docs/dev/tutorial.html#http-errors-and-redirects

from bottle import route, abort
@route('/restricted')
def restricted():
    abort(401, "Sorry, access denied.")

from bottle import redirect
@route('/wrong/url')
def wrong():
    redirect("/right/url")
