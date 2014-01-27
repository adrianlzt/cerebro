package {
    "django":
        ensure => "1.2.3",
        provider => pip;
    "mysql-python":
        ensure => "1.2.3",
        provider => pip;
}
