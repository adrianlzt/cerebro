function test(s)
{
  return s;
}

var res = test("hola");



function test(s, e="default") {}

if(typeof e == "undefined") {
  console.log("e no definida");
}
