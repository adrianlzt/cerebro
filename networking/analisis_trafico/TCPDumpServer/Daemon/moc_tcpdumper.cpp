/****************************************************************************
** Meta object code from reading C++ file 'tcpdumper.h'
**
** Created: Tue Nov 30 07:52:55 2010
**      by: The Qt Meta Object Compiler version 59 (Qt 4.4.3)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "tcpdumper.h"
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'tcpdumper.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 59
#error "This file was generated using the moc from 4.4.3. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
static const uint qt_meta_data_TCPDumper[] = {

 // content:
       1,       // revision
       0,       // classname
       0,    0, // classinfo
       2,   10, // methods
       0,    0, // properties
       0,    0, // enums/sets

 // slots: signature, parameters, type, tag, flags
      32,   15,   11,   10, 0x0a,
      55,   10,   10,   10, 0x0a,

       0        // eod
};

static const char qt_meta_stringdata_TCPDumper[] = {
    "TCPDumper\0\0int\0port,outfilename\0"
    "start(QString,QString)\0stop()\0"
};

const QMetaObject TCPDumper::staticMetaObject = {
    { &QObject::staticMetaObject, qt_meta_stringdata_TCPDumper,
      qt_meta_data_TCPDumper, 0 }
};

const QMetaObject *TCPDumper::metaObject() const
{
    return &staticMetaObject;
}

void *TCPDumper::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_TCPDumper))
        return static_cast<void*>(const_cast< TCPDumper*>(this));
    return QObject::qt_metacast(_clname);
}

int TCPDumper::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QObject::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: { int _r = start((*reinterpret_cast< QString(*)>(_a[1])),(*reinterpret_cast< QString(*)>(_a[2])));
            if (_a[0]) *reinterpret_cast< int*>(_a[0]) = _r; }  break;
        case 1: stop(); break;
        }
        _id -= 2;
    }
    return _id;
}
QT_END_MOC_NAMESPACE
