https://flutterbyexample.com/lesson/lists

var list = [];
var list = [1, 2, 3];

De un tipo:
final List<LatLng> foobar;
List<LatLng> lastLocations = [];


# sort
var numbers = ['one', 'two', 'three', 'four'];
numbers.sort((a, b) => a.length.compareTo(b.length));


var sortedKeys = map.keys.toList()..sort();

No se porque los dos puntos, pero no es un typo


# append
//adding single int to list
intArr.add(6);

//adding multiple int to list
intArr.addAll([7,8]);

//adding element or elements to specific location
//syntax: List.insert(index,value)
intArr.insert(0,0);

//syntax: List.insertAll(index, iterable_list_of _values)
intArr.insertAll(0,[-2,-1]);


# reversed
List<DataRow> resversedList = new List.from(stateRows.reversed);

