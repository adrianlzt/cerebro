notify {"I'm notifying you.":}

Para mensajes más grandes:
notify {'bignotify':
  message => "I'm completely enormous, and will mess up the formatting of your
          code! Also, since I need to fire before some other resource, you'll need
          to refer to me by title later using the Notify['title'] syntax, and you
          really don't want to have to type this all over again.",
}


notify  => [Exec[make-nag-cfg-readable],Service[nagios]]
