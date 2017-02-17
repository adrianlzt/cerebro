https://github.com/systemd/systemd/blob/master/HACKING

# En Arch
yaourt -S btrfs-progs mkosi dnf rpm-org
git clone git@github.com:systemd/systemd.git
cd systemd
sudo mkosi --password root
  he tenido que modificar el mkosi para meterle un --nogpgcheck porque fallava una key al instalar
  Modifico la pass de root, porque no la había definido al lanzar el mkosi
  sudo mount -o rw,loop,offset=269484032 image.raw /mnt/loop

sudo systemd-nspawn -bi image.raw

La imagen esta pelada, no tiene dnf, ni rpm, ni yum, ni vi, etc



sudo systemd-nspawn -bi image.raw
bash-4.3# mkdir -p /root/.config/systemd/user/
bash-4.3# echo -e "[Unit]\nDescription=test\n\n[Service]\nType=oneshot\nExecStart=/bin/false" > /root/.config/systemd/user/test.service
bash-4.3# systemctl --user daemon-reload
bash-4.3# systemctl --user start test
Job for test.service failed because the control process exited with error code.
See "systemctl --user status test.service" and "journalctl --user -xe" for details.





int bus_wait_for_jobs(BusWaitForJobs *d, bool quiet, const char* const* extra_args)
->
static int check_wait_response(BusWaitForJobs *d, bool quiet, const char* const* extra_args)
->
static void log_job_error_with_service_result(const char* service, const char *result, const char* const* extra_args)




Antes:
const char *extra_args
systemctl_extra_args = strjoin("systemctl ", extra_args, " ", NULL);


Primer cambio:
const char** extra_args
if (extra_args && extra_args[1]) {
        assert(extra_args[0] == NULL);
        extra_args[0] = "systemctl";
        systemctl = _systemctl = strv_join((char**) extra_args, " ");

Segundo cambio:
const char* const* extra_args
if (extra_args && extra_args[1]) {
        _cleanup_free_ char *t;

        t = strv_join((char**) extra_args, " ");
        systemctl = strjoina("systemctl ", t ? : "<args>");
        journalctl = strjoina("journalctl ", t ? : "<args>");

