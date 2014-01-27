#ifndef TCPDUMPER_H
#define TCPDUMPER_H

#include <QObject>
#include <QProcess>

class TCPDumper : public QObject
{
    Q_OBJECT

public:
    TCPDumper();

public slots:
    int start(QString port, QString outfilename);
    void stop();

private:
    bool running;
    QProcess *tcpdump;
};

#endif // TCPDUMPER_H
