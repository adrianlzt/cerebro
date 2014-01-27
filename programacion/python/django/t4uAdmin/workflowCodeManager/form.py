from django import forms
from django.core.validators import validate_email

class MultiEmailField(forms.Field):
	def to_python(self, value):
		"Normalize data to a list of strings."
		
		# Return an empty list if no input was given.
		if not value:
			return []
		return value.split('\r\n') #Encontrado usando el debugger

	def validate(self, value):
		"Check if value consists only of valid emails."

		# Use the parent's handling of required fields, etc.
		super(MultiEmailField, self).validate(value)

		for email in value:
			validate_email(email)


class MassiveMail(forms.Form):
	default_message = "Hello,\r\
This is just a mail for maintenance purpose.\r\
Thanks in advance.\r\
\r\
"

	sender = forms.EmailField(label='Your email')
	subject = forms.CharField(max_length=100, label='Subject')
	message = forms.CharField(widget=forms.Textarea, label='Mesage', initial=default_message)
	recipients = MultiEmailField(widget=forms.Textarea, label='Recipients (one email per row)')
	
	
class koalaUserForm(forms.Form):
	user = forms.RegexField(label='User', max_length=20, regex=r'^[a-z]+[a-z0-9]*$', widget=forms.TextInput(attrs={'class': 'required'}), error_message = ("User must be letters and numbers, but cannot start with a number."))
	password = forms.RegexField(label='Password', max_length=20, regex=r'^[a-zA-Z0-9!$%&/()=*+-_.,:;@#]+$', widget=forms.PasswordInput(render_value=False,attrs={'class': 'required'}), error_message = ("Invalid character for the password.")) 
	
	required_css_class = 'required' #For jquery validation
	
	# def clean(self):
		# cleaned_data = self.cleaned_data
		# user = cleaned_data.get("user")
		# password = cleaned_data.get("password")

		# if "a" in user:
			# raise forms.ValidationError("Has puesto una a en el usuario")
			
		# if "a" in password:
			# raise forms.ValidationError("Has puesto una a en el password")

		# return cleaned_data
