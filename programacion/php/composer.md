https://getcomposer.org/
Dependency Manager for PHP


composer.json file. This file describes the dependencies of your project and may contain other metadata as well

php composer.phar install

If you have never run the command before and there is also no composer.lock file present, Composer simply resolves all dependencies listed in your composer.json file and downloads the latest version of their files into the vendor directory in your project.
When Composer has finished installing, it writes all of the packages and the exact versions of them that it downloaded to the composer.lock file, locking the project to those specific versions. You should commit the composer.lock file to your project repo so that all people working on the project are locked to the same versions of dependencies


running install when a composer.lock file is present resolves and installs all dependencies that you listed in composer.json, but Composer uses the exact versions listed in composer.lock to ensure that the package versions are consistent for everyone working on your project


# Install
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('SHA384', 'composer-setup.php') === '544e09ee996cdf60ece3804abc52599c22b1f40f4323403c44d44fdfdd586475ca9813a858088ffbc1f233e9b180f061') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"


# Uso
php composer.phar require "swiftmailer/swiftmailer:^6.0"
