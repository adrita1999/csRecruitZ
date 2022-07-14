from django.shortcuts import render,HttpResponse
from .models import *
from .serializers import postSerializer
from  rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets

user = Jobseeker(user_id=1, name="Adrita Hossain Nakshi", email="adrita_99@yahoo.com", password="1234", thana="Boalia", district="Rajshahi", division="Rajshahi", father_name="Dr. Md. Elias Hossain", mother_name="Dr. Zennat Ferdousi", date_of_birth="1999-02-06", self_desc="I am a CS under-graduate.", nationality="Bangladeshi", nid_number="12345678", field="Teaching", pref_sal="50000", pref_job_ntr="Full-time", pref_org_type="Government", propic="propics_input/nakshi.jpeg", resume="resumes_input/nakshi.docx")
user.save()
emp = Employer(user_id=2, name="Optimizely", email="optimizely@gmail.com", password="1234", district="Dhaka", division="Dhaka", org_type="Non-government", establishment_year="2005")
emp.save()
emp = Employer(user_id=3, name="Kona SL", email="kona@yahoo.com", password="1234", district="Dhaka", division="Dhaka", org_type="Non-government", establishment_year="2001")
emp.save()
emp = Employer(user_id=4, name="Data Edge Ltd", email="dataedge@gmail.com", password="1234", district="Dhaka", division="Dhaka", org_type="Non-government", establishment_year="1996")
emp.save()
emp = Employer(user_id=5, name="Samsung", email="samsung@gmail.com", password="1234", district="Dhaka", division="Dhaka", org_type="Non-government", establishment_year="1981")
emp.save()
emp = Employer(user_id=6, name="Intelligent Machines Limited", email="iml@gmail.com", password="1234", district="Dhaka", division="Dhaka", org_type="Non-government", establishment_year="2015")
emp.save()
emp = Employer(user_id=7, name="BEPRC", email="beprc@gmail.com", password="1234", district="Dhaka", division="Dhaka", org_type="Government", establishment_year="1998")
emp.save()
emp = Employer(user_id=8, name="Bangladesh Airforce", email="airbd@gmail.com", password="1234", district="Dhaka", division="Dhaka", org_type="Government", establishment_year="1975")
emp.save()
contact = UserContact(user_contact_id=1, user_id=1, contact_no="01878046439")
contact.save()
contact = UserContact(user_contact_id=2, user_id=1, contact_no="01718464397")
contact.save()

class postViewsets(viewsets.ModelViewSet):
    # def list(self,request):
    #     posts = Jobpost.objects.all()
    #     serializer = postSerializer(posts, many=True)
    #     return Response(serializer.data)
    queryset = Jobpost.objects.all()
    serializer_class = postSerializer

# @api_view(['GET','POST'])
# def home(request):
#     #Jobpost.objects.create(title='Looking for a Software Engineer')
#     #Jobpost.objects.create(title="DevOps Engineer Needed")
#     #Jobpost.objects.create(title="Quality Assurance Engineer at Optimizely")
#     #Jobpost.objects.create(title="Hiring Security Expert")
#
#     #print("here")
#     if request.method=="GET":
#         posts=Jobpost.objects.all()
#         serializer=postSerializer(posts,many=True)
#         str=""
#         for post in posts:
#             str=str+post.title
#             str=str+"\n"
#             print(post.title)
#         return Response(serializer.data)

# Create your views here.
