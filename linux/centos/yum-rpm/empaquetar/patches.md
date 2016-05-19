http://www.rpm.org/max-rpm/s1-rpm-inside-macros.html
The %patch Macro


http://wiki.networksecuritytoolkit.org/nstwiki/index.php/HowTo_Create_A_Patch_File_For_A_RPM#Update_the_RPM_Spec_File_to_Apply_the_Patch

# In the top section (near Source line)
Patch1: base-1.4.4.patch

# And at the end of the %prep area
%prep
%setup -q -n %{name}-%{version}

%patch0 -p0
%patch1 -p0
