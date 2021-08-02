from django.urls import path
from . import views
urlpatterns = [
    path('',views.index,name='indexHome'),
    path('signupPage/',views.signupUser,name='signupUser'),
    path('signinPage/',views.signinUser,name='signinUser'),
    path('profile/',views.profile,name='profile'),
    path('profile/request/',views.requestToAdmin,name='requestToAdmin'),
    path('logout/',views.logouts,name='logout'),
]