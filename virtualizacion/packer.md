http://www.packer.io/
http://mitchellh.com/packer
https://github.com/mitchellh/packer

Packer is an open source tool for creating machine images, such as AMIs, VirtualBox images, Vagrant boxes, etc. Packer uses a single portable input format – a template – to generate the images for multiple platforms in parallel, so you can create identical AMIs, VMware machines, etc. all at once. This unlocks a lot of interesting use cases.

Packer is a tool for creating identical machine images for multiple platforms from a single source configuration.

Los ficheros se pueden generar en dos formatos, uno custom y otro JSON, por ejemplo: Packerfile.json
packer build Packerfile.json (parece que se suelen usar nombres tipo builds.pkr.hcl)

Se pueden definir builders y provisioners.


# Convertir json to hcl
packer hcl2_upgrade -with-annotations build.json
