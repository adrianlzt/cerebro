#include <QtCore/QCoreApplication>
#include <QtDBus/QtDBus>
#include <stdio.h>
#include "tcpdumper.h"

int main(int argc, char *argv[])
{
    QCoreApplication a(argc, argv);

/*
    TCPDumper dumper;
    QString aux = QString::number(dumper.start("80", "test.txt"));
    qDebug(aux.toAscii().constData());
*/

    if(!QDBusConnection::systemBus().isConnected()) {
        fprintf(stderr, "Cannot connect to the D-Bus system bus.\n"
                "To start it, run:\n"
                "\teval `dbus-launch --auto-syntax`\n"
                );
        return 1;
    }

    if(!QDBusConnection::systemBus().registerService("es.mensaje.tcpdumper")) {
        fprintf(stderr, "%s\n",
                qPrintable(QDBusConnection::systemBus().lastError().message())
                );
        exit(1);
    }

    TCPDumper dumper;
    QDBusConnection::systemBus().registerObject("/", &dumper, QDBusConnection::ExportAllSlots);

    return a.exec();
}
