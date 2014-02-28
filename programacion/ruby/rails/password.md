Encriptar un password:
Lo envío en el form como texto plano, y en el modelo del objeto pongo:

  before_save :encrypt_password
  def encrypt_password
    if password.present?
      self.encrypted_password = Digest::SHA1.hexdigest(password)
      self.password = nil
    end
  end

