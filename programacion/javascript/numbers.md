# int <-> hex
Convert a number to a hexadecimal string with:
hexString = yourNumber.toString(16);

and reverse the process with:
yourNumber = parseInt(hexString, 16);

# string <-> hex
http://stackoverflow.com/questions/21647928/javascript-unicode-string-to-hex

Modificado para sacar un formato como el hexlify de python
hola -> 686f6c61

String.prototype.hexEncode = function(){
    var i;
    var result = "";
    for (i=0; i<this.length; i++) {
        result += this.charCodeAt(i).toString(16);
    }
    return result
}

String.prototype.hexDecode = function(){
  var j;
  var hexes = this.match(/.{1,2}/g) || [];
  var back = "";
  for(j = 0; j<hexes.length; j++) {
      back += String.fromCharCode(parseInt(hexes[j], 16));
  }
  return back;
}

"mi cadena".hexEncode().hexDecode()
