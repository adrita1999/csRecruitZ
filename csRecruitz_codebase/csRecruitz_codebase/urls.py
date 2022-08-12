"""csRecruitz_codebase URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from first_module.views import *
from rest_framework.routers import DefaultRouter


router=DefaultRouter()
#router.register('',postViewsets,basename='posts')
router.register('',postViewsets_for_jobpost, basename='jobposts')
router.register(r'first_module/jobseeker',jobseekerViewsets)
router.register(r'first_module/recommendation',recoViewsets)
router.register(r'first_module/jobexp',jobexpViewsets)
router.register(r'first_module/uskill',uskillViewsets)
router.register(r'first_module/apply',applicationViewsets)

router.register(r'first_module/pub',publicationViewsets)

router.register(r'first_module/appliedjobs',appliedjobViewsets)


router.register(r'first_module/question',questionViewsets)

urlpatterns = [
    path('admin/', admin.site.urls),
    #path('',home),
    path('',include(router.urls)),

]
