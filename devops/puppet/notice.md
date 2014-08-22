Notice no devuelve un código 2 al ejecutarse, como si hace notify.

check.pp:
class check (
  $puerto
)
{
  notice "puerto: $puerto"
} 
class {'monitorizacion::check_tcp': puerto => '22'}

$ puppet apply check.pp




  each ($puerto) |$i,$p| {
    notice "puerto: $p"
    notice "error: ${error[$i]}"
  }
