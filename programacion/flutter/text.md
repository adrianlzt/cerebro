Text(
  "Tuesday",
  style: TextStyle(
      fontSize: 55,
      color: Color(0xffeba800),
      fontWeight: FontWeight.w600
  ),
)


# SizedBox
Evitamos variaciones de tamaño al cambiar el texto (11 ocupa menos que 00).

SizedBox(
  width: 18,
  child: SizedBox(
    child: Text('$_favoriteCount'),
  ),
),

# Multilinea
Widget textSection = const Padding(
  padding: EdgeInsets.all(32),
  child: Text(
    'Lake Oeschinen lies at the foot of the Blüemlisalp in the Bernese '
    'Alps. Situated 1,578 meters above sea level, it is one of the '
    'larger Alpine Lakes. A gondola ride from Kandersteg, followed by a '
    'half-hour walk through pastures and pine forest, leads you to the '
    'lake, which warms to 20 degrees Celsius in the summer. Activities '
    'enjoyed here include rowing, and riding the summer toboggan run.',
    softWrap: true, // text lines will fill the column width before wrapping at a word boundary
  ),
);
