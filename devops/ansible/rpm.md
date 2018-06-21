Instalando un rpm usando "rpm" con idempotencia (evitar que falle o cambie si ya está instalado)
- command: rpm -U "{{rpm}}"
  args:
    warn: false
  register: rpm_install
  failed_when: rpm_install.rc != 0 and "is already installed" not in rpm_install.stderr
  changed_when: rpm_install.rc == 0
