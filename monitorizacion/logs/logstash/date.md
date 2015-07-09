filter {
  ...
  
  date {
    match => [ "timestamp", "dd/MM/YYYY:HH:mm:ss Z" ]
    locale => en
  }
