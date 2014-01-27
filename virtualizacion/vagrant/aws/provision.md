La provision se hace copiando los ficheros por rsync a la instancia amazon.


# User data #
Es otra forma de provisionar que ofrece amazon:
Vagrant.configure("2") do |config|
  # ... other stuff

  config.vm.provider "aws" do |aws|
    # Option 1: a single string
    aws.user_data = "#!/bin/bash\necho 'got user data' > /tmp/user_data.log\necho"

    # Option 2: use a file
    aws.user_data = File.read("user_data.txt")
  end
end
