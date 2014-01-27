#include "tcpdumper.h"

TCPDumper::TCPDumper()
{
    this->running = false;
    this->tcpdump = NULL;
}

int TCPDumper::start(QString port, QString outfilename) {
    qDebug("start");
    if(!this->running) {
        this->running = true;

        QString program = "/usr/sbin/tcpdump";
        QStringList arguments;
        arguments << "port" << port;
        arguments << "-s" << "1500";
        arguments << "-w" << outfilename;

        tcpdump = new QProcess(this);
        tcpdump->start(program,arguments);
        tcpdump->waitForStarted();

        qDebug("OK");

        return tcpdump->pid();
    }

    return -1;
}

void TCPDumper::stop() {
    qDebug("stop");
    if(this->running) {
        this->running = false;

        tcpdump->terminate();
        delete tcpdump;
        tcpdump = NULL;

        qDebug("OK");
    }
}
