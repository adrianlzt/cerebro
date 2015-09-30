https://mailgun.com/
http://mandrill.com/
https://aws.amazon.com/es/ses/


# Mailgun
curl -s --user 'api:key-mykey' \
    https://api.mailgun.net/v3/mg.domain.com/messages \
    -F from='Excited User <mailgun@mg.domain.com>' \
    -F to=bot@domain.com \
    -F to=bar@example.com \
    -F subject='Hello' \
    -F text='Testing some Mailgun awesomness!'
