from django.db import models
from django.utils.text import slugify
# Create your models here.

class CATE(models.Model):
	cate = models.CharField(max_length=200)
	slug = models.SlugField(blank=True,null=True,default='slug-empty')

	def save(self, *args, **kwargs):
		self.slug = slugify(self.cate+'-'+str(self.id))
		super(CATE, self).save(*args, **kwargs)



class FILES(models.Model):
	file = models.FileField(upload_to='allfiles/',default='alt.png')
	uploaded_date = models.DateField(auto_now_add=True)
	cate = models.CharField(max_length=1000)
	filesize = models.CharField(max_length=200)
	filetype = models.CharField(max_length=200)
	filename = models.CharField(max_length=1000)


class VisualizedData(models.Model):
	cate = models.CharField(max_length=1000)
	title = models.CharField(max_length=10000)
	des = models.TextField(max_length=1000000)
	figure = models.TextField(max_length=1000000)

class UserData(models.Model):
	file = models.FileField(upload_to='UserDataFiles/',default='alt.jpeg')
	about = models.CharField(max_length=10000,blank=True,default='')
	userid = models.CharField(max_length=100000,blank=False,default='')
