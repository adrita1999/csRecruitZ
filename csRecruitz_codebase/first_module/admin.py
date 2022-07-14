from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(User)
admin.site.register(UserContact)
admin.site.register(Jobseeker)
admin.site.register(Employer)