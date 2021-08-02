from django.urls import path
from . import views
urlpatterns = [
    path('',views.index,name='index'),
    path('Signin/',views.Signin,name='Signin'),
    path('DashBoard/',views.DashBoard,name='DashBoard'),
    path('Logout/',views.Logout,name='Logout'),
    path('<str:cate_slug>/',views.cate_action,name='cate_action'),
    path('<str:cate_slug>/<str:no_allowed_slug>/',views.cate_action,name='cate_action'),
    path('<str:cate_slug>/<str:no_allowed_slug>/<str:fid>/',views.visualize,name='visualize'),
    path('<str:cate_slug>/<str:no_allowed_slug>/<str:fid>/<str:default_url>/',views.visualize,name='visualize'),
]