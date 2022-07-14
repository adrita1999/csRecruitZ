from django.db import models

# Create your models here.
class Jobpost(models.Model):
    title=models.CharField(max_length=200)


class User(models.Model):
    user_id = models.IntegerField(primary_key=True)
    password = models.CharField(max_length=20)
    name = models.CharField(max_length=40)
    email = models.EmailField(unique=True)
    # address
    thana = models.CharField(max_length=30, blank=True, null=True)
    district = models.CharField(max_length=30)
    division = models.CharField(max_length=30)


class UserContact(models.Model):
    user_contact_id = models.IntegerField(primary_key=True)
    user_id = models.IntegerField()
    contact_no = models.CharField(max_length=15)

    class Meta:
        unique_together = (("user_id", "contact_no"),)


class Employer(User):
    org_type = models.CharField(max_length=20)
    establishment_year = models.IntegerField()


class Jobseeker(User):
    father_name = models.CharField(max_length=40)
    mother_name = models.CharField(max_length=40)
    self_desc = models.CharField(max_length=200)
    propic = models.ImageField(upload_to='images', null=True)
    date_of_birth = models.DateField()
    nationality = models.CharField(max_length=20)
    field = models.CharField(max_length=20)
    nid_number = models.IntegerField(unique=True)
    pref_job_ntr = models.CharField(max_length=20)
    pref_org_type = models.CharField(max_length=20)
    pref_sal = models.IntegerField(unique=True)
    resume = models.FileField(upload_to='resumes', null=True)



