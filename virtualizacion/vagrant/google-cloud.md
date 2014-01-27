https://github.com/mitchellh/vagrant-google

Next, visit the API Console, select Services and enable the Google Compute Engine service for your project. If prompted, review and agree to the terms of service.
https://code.google.com/apis/console/
Para activar esto nos piden Billing.
No lo hago, por ahora no tengo interés en probarlo.

vagrant plugin install vagrant-google
vagrant box add gce https://github.com/mitchellh/vagrant-google/raw/master/google.box

Vagrantfile:
Vagrant.configure("2") do |config|
  config.vm.box = "gce"

  config.vm.provider :google do |google, override|
    google.google_project_id = "YOUR_GOOGLE_CLOUD_PROJECT_ID"
    google.google_client_email = "YOUR_SERVICE_ACCOUNT_EMAIL_ADDRESS"
    google.google_key_location = "/PATH/TO/YOUR/PRIVATE_KEY.p12"

    override.ssh.username = "USERNAME"
    override.ssh.private_key_path = "~/.ssh/id_rsa"
    #override.ssh.private_key_path = "~/.ssh/google_compute_engine"
  end

end

vagrant up --provider=google


