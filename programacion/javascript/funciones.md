function test(s)
{
  return s;
}

var res = test("hola");



function test(s, e="default") {}

if(typeof e == "undefined") {
  console.log("e no definida");
}


Para devolver varios valores usar un array o un dict:

return [dCodes, dCodes2];

return {
    dCodes: dCodes,
    dCodes2: dCodes2
};
