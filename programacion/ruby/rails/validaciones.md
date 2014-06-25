http://guides.rubyonrails.org/active_record_validations.html

app/models/check.rb
class Check < ActiveRecord::Base
  validates :name, presence: true
  validates :name, :login, :email, presence: true
  validates :points, numericality: true
  validates :environment_id, numericality: { only_integer: true }
  validates :name, format: { with: /\A[a-zA-Z0-9]+\z/, message: "only allows letters and numbers" }
  validates :name, format: { with: /\A[a-zA-Z0-9\-\.]+\z/, message: "only allows letters, numbers, '-' and '.'" }
  validates :gateway, :uniqueness => true, :format => { :with => Resolv::IPv4::Regex } #require 'resolv'
end

Si definimos cualquier validate el presence=true va por defecto.


s = Service.new
s.name = ...
...
s.valid?
s.errors.messages

if !st.save
  logger.debug "DEBUG: Error actualizando service #{st.name} del hostgroup #{hgto.name}. Valid? #{st.valid?}. Errors: #{st.errors.messages}"
end



## Boolean
validates :field_name, inclusion: { in: [true, false] }


## Permitir que el formulario envíe un carácter en blanco y convertirlo 
validates :check_freshness, allow_blank: true, allow_nil: true, inclusion: { in: 0..1, message: ". Only 0, 1 or nil" }
validates :freshness_threshold, allow_blank: true, allow_nil: true, inclusion: { in: 0..1, message: ". Only 0, 1 or nil" }
NULL_ATTRS = %w( check_freshness freshness_threshold )
before_save :nil_if_blank

protected

def nil_if_blank
  NULL_ATTRS.each { |attr| self[attr] = nil if self[attr].blank? }
end


