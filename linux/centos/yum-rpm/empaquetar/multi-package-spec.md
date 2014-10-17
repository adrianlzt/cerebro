Se pueden generar varios rpms en un solo .spec
Ejemplo: http://pkgs.fedoraproject.org/cgit/nagios-plugins.git/tree/nagios-plugins.spec

...
%package cluster
Summary: Nagios Plugin - check_cluster
Group: Applications/System
Requires: nagios-plugins = %{version}-%{release}

%description cluster
Provides check_cluster support for Nagios.

%package dbi
Summary: Nagios Plugin - check_dbi
Group: Applications/System
Requires: nagios-plugins = %{version}-%{release}

%description dbi
Provides check_dbi support for Nagios.
...
