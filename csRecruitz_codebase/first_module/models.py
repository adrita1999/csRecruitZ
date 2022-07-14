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

class NewJobpost(models.Model):
    jobpost_id = models.IntegerField(primary_key=True)
    employer_id = models.ForeignKey(Employer,  on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=200)
    post_date = models.DateField()
    deadline_date = models.DateField()
    salary = models.IntegerField()
    required_experience = models.IntegerField()
    vacancies = models.IntegerField()
    job_context = models.TextField()
    job_nature = models.TextField()
    job_responsibilities = models.TextField()
    edu_requirement = models.TextField()
    additional_requirements = models.TextField()
    application_process = models.TextField()


class Skill(models.Model):
    skill_id = models.IntegerField(primary_key=True)
    skill_name = models.CharField(max_length=100)
    gap_between_consecutive_attempts = models.IntegerField()


class JobSeekerSkill(models.Model):
    jobseeker_skill_id = models.IntegerField(primary_key=True)
    user_id = models.ForeignKey(User,  on_delete=models.CASCADE)
    skill_id = models.ForeignKey(Skill,  on_delete=models.CASCADE)
    isOpenToWork = models.BooleanField(default=False)


class JobSkill(models.Model):
    job_skill_id = models.IntegerField(primary_key=True)
    jobpost_id = models.ForeignKey(Jobpost,  on_delete=models.CASCADE)
    skill_id = models.ForeignKey(Skill,  on_delete=models.CASCADE)
