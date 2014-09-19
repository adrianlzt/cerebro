//
// rhino reverseStr.js
//
function reverseStr(s)
{
  var result = "";
  for (var i = s.length - 1; i > -1; --i) {
    result += s.charAt(i);
  }
  return result;
}

var res = reverseStr("hola");
print(res);
