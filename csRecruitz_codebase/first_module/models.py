from django.db import models

# Create your models here.
class Jobpost(models.Model):
    title=models.CharField(max_length=200)

