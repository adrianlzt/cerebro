https://blog.gruntwork.io/a-comprehensive-guide-to-managing-secrets-in-your-terraform-code-1d586955ace1#bebe

Technique #1: Environment Variables
Technique #2: Encrypted Files (e.g., KMS, PGP, SOPS)
Technique #3: Secret Stores (e.g., Vault, AWS Secrets manager, gopass)
https://github.com/camptocamp/terraform-provider-pass


# Env vars
variable "username" {
  description = "The username for the DB master user"
  type        = string
  sensitive   = true
}

resource "aws_db_instance" "example" {
  engine               = "mysql"
  engine_version       = "5.7"
  username             = var.username
  password             = var.password
}

export TF_VAR_username=(the username)
export TF_VAR_password=(the password)

