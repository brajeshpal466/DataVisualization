from django.shortcuts import render,redirect
from .models import *
from django.http import HttpResponseRedirect,HttpResponse
from django.contrib import messages
from django.contrib.auth.models import User,auth
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.core.paginator import Paginator,EmptyPage,PageNotAnInteger
from django.contrib.auth.decorators import login_required
from home.forms import *
from Admincontrol.models import *
# Create your views here.


@login_required(login_url='indexHome')
def requestToAdmin(request):
	try:
		if request.method=="POST" and request.FILES['filedata']:
			about = request.POST['title']
			file = request.FILES['filedata']
			cate = request.POST['category']
			filecheck = str(file).split('.')
			filename  = filecheck[0]
			filetype  = filecheck[-1]
			filesize  = str(round((file.size/1024)/1024,4))+"MB"
			if cate=="Select":
				messages.error(request,'Please Select Category')
			if about=='':
				messages.error(request,"Please Fill about")
			else:
				if str(filetype).lower() not in ['csv','txt']:
					messages.error(request,f'{filetype} files Are Not Allowed To Upload')
				else:	
					Create = FILES.objects.create(file=file,cate=cate,filesize=filesize,filetype=filetype,filename=filename)
					Create.save()
					files = UserData.objects.create(file=file,about=about,userid=request.user.id)
					files.save()
					messages.info(request,"Successfully Uploaded")
	except Exception as e:
		messages.error(request,"Please Choose File")
			
	obj = UserData.objects.all().filter(userid=request.user.id)
	cates = CATE.objects.all()
	return render(request,'home/request.html',{"cate":cates,"obj":obj})




def index(request):
	if request.user.is_authenticated:
		return redirect('profile')
	# vd = VisualizedData.objects.all()
	return render(request,'home/index.html')


def signupUser(request):
	if request.method=="POST":
		name = request.POST['fname']
		uname = request.POST['uname']
		uemail = request.POST['emailid']
		upass = request.POST['pass1']
		upc = request.POST['pass2']

		if name=='' or uname=='' or uemail=='':
			messages.error(request,"Fill Details!")
			return redirect('indexHome')
		if User.objects.filter(username=uname).exists():
			messages.error(request,"Username Already Exists!")
			return redirect('indexHome')
		if User.objects.filter(email=uemail).exists():
			messages.error(request,"Email Already Exists!")
			return redirect('indexHome')
		if upass!=upc or upass=='' or upc=='':
			messages.error(request,"Confirm Password Not Matched or Empty!")
			return redirect('indexHome')


		else:
			user = User.objects.create_user(first_name=name,username=uname,email=uemail,password=upass)
			user.save()
			messages.info(request,"User Successfully Created")
			return redirect('indexHome')

	
	return render(request,'home/index.html')


def signinUser(request):
	if request.user.is_authenticated:
		return redirect('profile')
	else:	
		if request.method=="POST":
			uname = request.POST['uname2']
			upass = request.POST['pass3']
			print(upass)
			user = auth.authenticate(request,username=uname,password=upass)
			if user is not None:
				login(request,user)
				return redirect('profile')
			else:
				messages.error(request,"Invalid user")
				return redirect('indexHome')

		return render(request,'home/index.html')


@login_required(login_url='indexHome')
def profile(request):
	vd = VisualizedData.objects.all()
	return render(request,'home/profile.html',{"vd":vd})

def logouts(request):
	logout(request)
	return redirect('indexHome')
