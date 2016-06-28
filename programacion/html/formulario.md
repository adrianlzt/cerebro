http://www.w3schools.com/html/html_forms.asp

<form action="action_page.php">
  First name:<br>
  <input type="text" name="firstname" value="Mickey"><br>
  Last name:<br>
  <input type="text" name="lastname" value="Mouse"><br><br>
  <input type="submit" value="Submit">
</form>

Si quiero que use post:
    <form action="config" method="post">


Para enviar varios valores:
  <input type="checkbox" name="host[]" value="hostname1" />
  <input type="checkbox" name="host[]" value="hostname2" />

