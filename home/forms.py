from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.contrib.auth.models import User

class UserSignup(UserCreationForm):
	username = forms.CharField(max_length=30,widget=forms.TextInput(
		attrs={"class":"form-control","id":"username_signup_id"}))
	email = forms.EmailField(max_length=100,widget=forms.TextInput(
		attrs={"class":"form-control","id":"email_signup_id"}))
	password1 = forms.CharField(max_length=50,widget=forms.TextInput(
		attrs={"class":"form-control","id":"pass1_signup_id"}))
	password2 = forms.CharField(max_length=50,widget=forms.TextInput(
		attrs={"class":"form-control","id":"pass2_signup_id"}))


	class Meta:
		model = User
		fields = ["username","email","password1","password2"]


class UserSignin(UserCreationForm):
	username = forms.CharField(max_length=100,widget=forms.TextInput(
		attrs={"class":"form-control","id":"email_signin_id"}))
	password1 = forms.CharField(max_length=50,widget=forms.TextInput(
		attrs={"class":"form-control","id":"pass1_signin_id"}))
	

	class Meta:
		model = User
		fields = ['username','password1']