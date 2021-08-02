from django.shortcuts import render,redirect
from .models import *
from django.http import HttpResponse
from django.contrib import messages
import pandas as pd
import matplotlib
import matplotlib.pyplot as plt
matplotlib.use("Agg")
import io
from django.contrib.auth.models import User,auth
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.contrib.auth.decorators import login_required

# Create your views here.

def Logout(request):
	logout(request)
	return redirect('Signin')


@login_required(login_url='Signin')
def DashBoard(request):

	vd = VisualizedData.objects.filter(cate='education-1')
	vd2 = VisualizedData.objects.filter(cate='politics-2')
	vd3 = VisualizedData.objects.filter(cate='pandemic-3')
	vd4 = VisualizedData.objects.filter(cate='health-4')
	return render(request,'Admincontrol/DashBoard.html',{"vd":vd,"vd2":vd2,"vd3":vd3,"vd4":vd4})

@login_required(login_url='Signin')
def visualize(request,cate_slug='',no_allowed_slug='',fid='',default_url=''):
	if default_url=="save_to_data" and request.method=="POST":
		des = request.POST['des']
		title = request.POST['title']
		figures = request.POST['figure']
		if des=="" or title=="":
			return HttpResponse("Please Fill")
		else:
			obj = VisualizedData.objects.create(cate=cate_slug,title=title,des=des,figure=figures)
			obj.save()
			return HttpResponse("Success")
	# bar chart
	if default_url=="draw_bar" and request.method=="POST":
		xl = []
		xl_cus = []

		xl = request.POST.getlist('xlabels[]')
		xl_cus = request.POST.getlist('x_labels_customs[]')
		color = request.POST['colors']
		width = request.POST['widths']

		chooseF = FILES.objects.filter(id=fid)
		Means = [] 
		for f in chooseF:
			df = pd.read_csv('media/'+str(f.file))
			for c in xl:
				Means.append(df[c].mean())
		fig = plt.figure(figsize=(6,6))
		if color=='' and width!='':
			plt.bar(xl_cus,Means,width=float(width))
		elif width=='' and color!='':
			plt.bar(xl_cus,Means,color=color)
		elif color!='' and width!='':
			plt.bar(xl_cus,Means,color=color,width=float(width))
		else:
			plt.bar(xl_cus,Means)
		imgdata = io.StringIO()
		fig.savefig(imgdata,format='svg')
		imgdata.seek(0)
		data = imgdata.getvalue()
		return HttpResponse(data)
	# pie chart 
	if default_url=="draw" and request.method=="POST":
		cols = []
		colors = []
		labels = []
		explodes = []
		startangle = request.POST['startangle']
		shadows = request.POST['shadow']
		atpct = request.POST['autopct'] 
		colors = request.POST.getlist("pie_colors[]")
		labels = request.POST.getlist("pie_labels[]")
		explodes = request.POST.getlist("pie_explodes[]")
		cols = request.POST.getlist("cols[]")
		means_values = []
		chooseFile = FILES.objects.filter(id=fid)
		exp = []
		for e in explodes:
			exp.append(float(e))
		for f in chooseFile:
			df = pd.read_csv("media/"+str(f.file))
			for m in cols:
				print(df[m].mean())
				if df[m].mean()<0:
					means_values.append((-1)*df[m].mean())
				else:
					means_values.append(df[m].mean())
		
		fig = plt.figure(figsize=(5,6))
		plt.pie(means_values,labels=labels,autopct="%1.1f%%",shadow=True,explode=tuple(exp))
		plt.legend(labels)
		imgdata = io.StringIO()
		fig.savefig(imgdata,format='svg')
		imgdata.seek(0)
		data = imgdata.getvalue()
		print(len(data))

		return HttpResponse(data)


		




	if default_url=='upload_all_file_page':
		return redirect('http://127.0.0.1:8000/Admincontrol/'+default_url)

	if default_url=="preview" and request.method=="POST":
		all_values = []
		all_values = request.POST.getlist('all_values[]')
		chartType = request.POST['chart_type']
		if chartType=="bar_chart":
			final_all_labels1 = []
			for j in all_values:
				if j is not "0":
					final_all_labels1.append(j) 
			return render(request,'Admincontrol/visualize/setBarChart.html',{"final_all_labels1":final_all_labels1})

		if chartType=="pie_chart":
			final_all_labels = []
			for i in all_values:
				if i is not "0":
					final_all_labels.append(i) 
			if(len(final_all_labels)>6):
				return HttpResponse("PieChartProblem")
			return render(request,'Admincontrol/visualize/setPieChart.html',{"final_all_labels":final_all_labels,"count_value":len(final_all_labels)})
		
		if chartType=="histogram":
			final_all_labels2 = []
			for k in all_values:
				if k is not "0":
					final_all_labels2.append(k) 
			return render(request,'Admincontrol/visualize/setHistogram.html',{"final_all_labels2":final_all_labels2})


	choose_file = FILES.objects.filter(id=fid)
	cols = []
	for i in choose_file:
		df1 = pd.read_csv('media/'+str(i.file))
	for col in df1.columns:
		cols.append(col)

	return render(request,'Admincontrol/visualize/visualize.html',{"cols":cols,"df1":df1})

@login_required(login_url='Signin')
def index(request):
	cates = CATE.objects.all()
	return render(request,'Admincontrol/index.html',{"cates":cates})





def Signin(request):
	if request.user.is_authenticated:
		return redirect('DashBoard')
	if request.method=="POST":
		un = request.POST['username']
		ps = request.POST['password']
		user  = auth.authenticate(request,username=un,password=ps)

		if user is not None:
			login(request,user)
			return redirect('DashBoard')
		else:
			messages.error(request,"Invalid User")
			return redirect('Signin')

	return render(request,'Admincontrol/Signin.html')



@login_required(login_url='Signin')
def cate_action(request,cate_slug,no_allowed_slug=''):
	if no_allowed_slug=='upload_all_file_page':
		return redirect('http://127.0.0.1:8000/Admincontrol/'+no_allowed_slug)
	if no_allowed_slug=="uploadfile":
		try:
			if request.method=="POST" and request.FILES['files_upload']:
				file = request.FILES['files_upload']
				cate = request.POST['category']
				filecheck = str(file).split('.')
				filename  = filecheck[0]
				filetype  = filecheck[-1]
				filesize  = str(round((file.size/1024)/1024,4))+"MB"
				if cate=="Select":
					messages.error(request,'Please Select Category')
					return redirect('http://127.0.0.1:8000/Admincontrol/upload_all_file_page/')
				else:
					if str(filetype).lower() not in ['csv','txt']:
						messages.error(request,f'{filetype} files Are Not Allowed To Upload')
						return redirect('http://127.0.0.1:8000/Admincontrol/upload_all_file_page/')
					else:	

						Create = FILES.objects.create(file=file,cate=cate,filesize=filesize,filetype=filetype,filename=filename)
						Create.save()
						messages.info(request,filename+' is '+' Successfully Uploaded')
						return redirect('http://127.0.0.1:8000/Admincontrol/upload_all_file_page/')

		except Exception as e:
			messages.error(request,'Please Choose File')
			return redirect('http://127.0.0.1:8000/Admincontrol/upload_all_file_page/')


	if request.method=="POST" and request.POST['action']=='delete_file':
		ids = []
		ids = request.POST.getlist('dels[]')
		if ids==[]:
			return HttpResponse('empty')
		else:
			for  i in ids:
				check_to_del = FILES.objects.filter(id=i)
				check_to_del.delete()
			return HttpResponse('deleted_item')

# all cate views
	
	if cate_slug=="education-1" and request.method=="POST" and request.POST['action']=="view-open":
		file = FILES.objects.filter(id=request.POST['pid'])

		for i in file:
			df = pd.read_csv("media/"+str(i.file))
			return HttpResponse(df.to_html())

	if cate_slug=="politics-2" and request.method=="POST" and request.POST['action']=="view-open":
		file = FILES.objects.filter(id=request.POST['pid'])

		for i in file:
			df = pd.read_csv("media/"+str(i.file))
			return HttpResponse(df.to_html())

	if cate_slug=="pandemic-3" and request.method=="POST" and request.POST['action']=="view-open":
		file = FILES.objects.filter(id=request.POST['pid'])

		for i in file:
			df = pd.read_csv("media/"+str(i.file))
			return HttpResponse(df.to_html())

	if cate_slug=="health-4" and request.method=="POST" and request.POST['action']=="view-open":
		file = FILES.objects.filter(id=request.POST['pid'])

		for i in file:
			df = pd.read_csv("media/"+str(i.file))
			return HttpResponse(df.to_html())




	cates = CATE.objects.all()
	filedata = FILES.objects.all().order_by('-id')
	cate_file = FILES.objects.filter(cate=cate_slug)
	return render(request,'Admincontrol/'+cate_slug+'.html',{"cate":cates,"filedata":filedata,"cate_file":cate_file})

