import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'dart:developer' as developer;

class GetUserName extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Usamos FutureBuilder para pasarle un futuro y que nos llame cuando ese futuro este resuleto.
    // Un futuro es una función que devolverá algo en el futuro.
    // Le tenemos que especificar que tipo le estamos pasando (en este caso QuerySnapshot)
    return FutureBuilder<QuerySnapshot>(
        // Aqui le pasamos el futuro, que es la query a firestore
        future: FirebaseFirestore.instance
            .collection('vehicle_locationX')
            .orderBy("timestamp", descending: true)
            .limit(3)
            .get(),
        // Esta es la función que será llamada cuando se resuelva el futuro
        // snapshot será un tipo de dato AsyncSnapshot (https://api.flutter.dev/flutter/widgets/AsyncSnapshot-class.html)
        builder: (context, snapshot) {
          developer.log("size: ${snapshot.hasData}");
          if (snapshot.hasData) {
            // Dentro del AsycnSnapshot, usando ".data" podemos obtener el valor de la query, en este caso un QuerySnapshot
            // https://pub.dev/documentation/cloud_firestore/latest/cloud_firestore/QuerySnapshot-class.html
            final data = snapshot.data!;
            if (data.size == 0) {
              return Text("no hay puntos");
            }

            final List<DocumentSnapshot> documents = data.docs;
            return ListView(
                children: documents
                    .map((doc) => Card(
                          child: ListTile(
                              title: Text(doc['timestamp'].toDate().toString()),
                              subtitle: Text(
                                  "(${doc['coordinates'].latitude}, ${doc['coordinates'].longitude})")),
                        ))
                    .toList());
          } else if (snapshot.hasError) {
            // Que hacer si hubo problemas con el snapshot
            return Text('snapshot error');
          }
          // Que hace si no tenemos datos (que es distinto a tener una query con 0 resultados)
          return Text('snapshot does not have data');
        });
  }
}
