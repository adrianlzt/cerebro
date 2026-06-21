Reloj para correr.

Desde la web podemos saltar al detalle de las actividades desde https://connect.garmin.com/modern/report

Si exportamos en .tcx es un XML con los datos.

Sacar fecha y pulsaciones en formato:
2021-11-27T09:10:37.000Z,137

cat export_garmin.tcx| xq '.TrainingCenterDatabase.Activities.Activity.Lap.Track.Trackpoint[] | .Time,  .HeartRateBpm.Value' -r | paste -d ',' - - > garmin_bpm.data

## Connect IQ app development

### Device specs
- Part Number: `006-B3076-00` (FR245, not Music)
- Firmware: `13.00`
- CIQ VM version: `3.3.6`
- Max apps: 32
- App storage: 4MB

### SDK
- Use SDK Manager to download the latest SDK (currently 9.2.0)
- On Arch Linux, the AUR package is broken (depends on old webkit2gtk-4.0)
- Workaround: use pcolby/connectiq-sdk-manager AppImage or download SDK zip directly
- SDK lives in `~/.Garmin/ConnectIQ/SDK/<version>/`

### CIQ version header problem
SDK 9.2.0 embeds CIQ 6.0.2 in the .prg header. The FR245 only supports
CIQ up to 3.3.x and silently ignores .prg files with a higher version.

The CIQ version comes from the first line of `api.db` (e.g. "6.0.2").
The compiler reads it and writes it to byte 8-10 of the .prg header.
The `minApiLevel` in `manifest.xml` does NOT affect this — it's always
the SDK's api.db version.

**Fix:** patch `api.db` before compilation:
```bash
sed "1s/.*/3.3.0/" api.db > api_patched.db
```
Then pass `-a api_patched.db` to the compiler.

The .prg header is 13 bytes:
```
d0 00 d0 00  00 00 00 21  00 03 03 00 00 ...
                              ^  ^  ^
                              |  |  └─ patch (0)
                              |  └──── minor (3)
                              └─────── major (3) → CIQ 3.3.0
```

### Compiler flags
Critical flags for FR245 builds:
- `-r` (release mode, strips debug info) — without this the .prg is ~89KB
- `-O 3` (max optimization) — without this the .prg includes unoptimized code
- `-a <api.db>` — API definitions (use patched version for CIQ 3.3.0)
- `-b <api.mir>` — compiled API intermediate representation
- `-f <jungle>` — project jungle file
- `-p <projectInfo.xml>` — project metadata
- `-y <developer_key.der>` — signing key
- `-d <device>` — target device (fr245)
- `--override-devices-json <dir>` — device profiles directory

With `-r -O 3` the hello world .prg is ~6KB.

### Developer key
Generate a 4096-bit RSA key:
```bash
openssl genrsa -out developer_key.pem 4096
openssl pkcs8 -topk8 -inform PEM -outform DER \
  -in developer_key.pem -out developer_key.der -nocrypt
```
Pass to compiler with `-y developer_key.der`.

**No developer registration is needed for sideloading.** The watch accepts
any .prg signed with a valid 4096-bit RSA DER key. The old theory about
needing to register the public key via Garmin Express was incorrect.

### Device profiles
SDK 9.x requires JSON device profiles instead of the old devices.xml.
They go in `~/.Garmin/ConnectIQ/Devices/<device-id>/compiler.json`.

If you need to regenerate them from the devices.xml embedded in
monkeybrains.jar, extract and convert with a Python script.

### Sideloading
1. Connect watch via USB — appears as a mass storage device labeled `GARMIN`
2. The kernel log shows it first connects as a serial device (ttyUSB)
   then reconnects as mass storage. There's a ~1s delay before it's mountable.
3. Copy .prg to `GARMIN/APPS/` on the watch
4. Unmount and restart the watch
5. Data fields appear in: Activity → Data Screens → Connect IQ

### Watch logs
Mount the watch and check `GARMIN/APPS/LOGS/CIQ_LOG.YML`.

To capture `System.println()` output, create an empty file named after
the .prg with `.txt` extension in `GARMIN/APPS/LOGS/` (e.g. `HelloWorld.TXT`).

### Simulator
```bash
simulator & monkeydo HelloWorld.prg fr245
```
The `simulator` binary starts the device emulator (needs a display).
`monkeydo` pushes the .prg to a running simulator instance.
