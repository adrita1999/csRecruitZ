from django.shortcuts import render, HttpResponse
from .models import *
from .serializers import *
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework import viewsets, status

user1 = Jobseeker(user_id=1, name="Adrita Hossain Nakshi", email="adrita_99@yahoo.com", password="1234", thana="Boalia",
                  district="Rajshahi", division="Rajshahi", father_name="Dr. Md. Elias Hossain",
                  mother_name="Dr. Zennat Ferdousi", date_of_birth="1999-02-06", self_desc="I am a CS under-graduate.",
                  nationality="Bangladeshi", nid_number="12345678", field="Teaching", pref_sal="50000",
                  pref_job_ntr="Full-time", pref_org_type="Government", propic="propics_input/nakshi.jpeg",
                  resume="resumes_input/nakshi.docx")
user1.save()
emp1 = Employer(user_id=2, name="Optimizely", email="optimizely@gmail.com", password="1234", district="Dhaka",
                division="Dhaka", org_type="NGO", establishment_year="2005")
emp1.save()
emp2 = Employer(user_id=3, name="Kona SL", email="kona@yahoo.com", password="1234", district="Dhaka", division="Dhaka",
                org_type="NGO", establishment_year="2001")
emp2.save()
emp3 = Employer(user_id=4, name="Data Edge Ltd", email="dataedge@gmail.com", password="1234", district="Dhaka",
                division="Dhaka", org_type="NGO", establishment_year="1996")
emp3.save()
emp4 = Employer(user_id=5, name="Samsung", email="samsung@gmail.com", password="1234", district="Dhaka",
                division="Dhaka", org_type="NGO", establishment_year="1981")
emp4.save()
emp5 = Employer(user_id=6, name="Intelligent Machines Limited", email="iml@gmail.com", password="1234",
                district="Dhaka", division="Dhaka", org_type="NGO", establishment_year="2015")
emp5.save()
emp6 = Employer(user_id=7, name="BEPRC", email="beprc@gmail.com", password="1234", district="Dhaka", division="Dhaka",
                org_type="Government", establishment_year="1998")
emp6.save()
emp7 = Employer(user_id=8, name="Bangladesh Airforce", email="airbd@gmail.com", password="1234", district="Dhaka",
                division="Dhaka", org_type="Government", establishment_year="1975")
emp7.save()
contact1 = UserContact(user_contact_id=1, user_id=1, contact_no="01878046439")
contact1.save()
contact2 = UserContact(user_contact_id=2, user_id=1, contact_no="01718464397")
contact2.save()
jobpost1 = NewJobpost(jobpost_id=1, employer_id=emp1, title="Senior Software Engineer",
                      category="Research and Development", post_date="2022-06-28", deadline_date="2022-07-28",
                      salary=55000, required_experience=5, vacancies=2,
                      job_context="We are looking for a Sr. Software Engineer who will able to produce scalable software solutions. Selected Candidate will be the part of a cross-functional team that’s responsible for the full software development life cycle, from conception to deployment. As a Sr. Software Engineer, Candidate should be comfortable around both front-end and back-end coding languages, development frameworks and third-party libraries. Candidate should also be a team player with a knack for visual design and utility.",
                      job_nature="Full-time",
                      job_responsibilities="Work with development teams and product managers to ideate software solutions. Design client-side and server-side architecture",
                      edu_requirement="M.Sc/ B.Sc in Computer Science & Engineering or relevant degree from any reputed University",
                      additional_requirements="Work experience as a Full Stack Developer or similar role.",
                      application_process=" Email your CV from MY BDJOBS account.")
jobpost1.save()
jobpost2 = NewJobpost(jobpost_id=2, employer_id=emp2, title="Software Developer", category="Research and Development",
                      post_date="2022-06-26", deadline_date="2022-07-26", salary=50000, required_experience=3,
                      vacancies=2,
                      job_context="We are looking for a .NET Software Engineer to join our development team. The selected software engineers will get a chance to work with the latest technology stacks, exercising industry-standard principles & best practices to build scalable, high performance & robust software solutions.",
                      job_nature="Full-time",
                      job_responsibilities=" Good knowledge and understanding of ASP.NET Web Services, Restful Web APIs, OData, Entity Framework, Asynchronous Programming in C#, LINQ, Lambdas, Func, Action, Routing, Model Binding, MSSQL, MongoDb, etc.",
                      edu_requirement="Bachelor of Science (BSc) in Computer Science & Engineering, Bachelor of Computer Application (BCA) in Computer Applications",
                      additional_requirements="Age at least 24 years",
                      application_process="*Photograph must be enclosed with the resume.")
jobpost2.save()


class postViewsets(viewsets.ModelViewSet):
    # def list(self,request):
    #     posts = Jobpost.objects.all()
    #     serializer = postSerializer(posts, many=True)
    #     return Response(serializer.data)
    queryset = Jobpost.objects.all()
    serializer_class = postSerializer


class postViewsets_for_jobpost(viewsets.ModelViewSet):
    # def list(self,request):
    #     posts = Jobpost.objects.all()
    #     serializer = postSerializer(posts, many=True)
    #     return Response(serializer.data)
    queryset = NewJobpost.objects.all()

    @action(methods=['post'], detail=False ,url_path='searchinput')
    def follow(self, request):
        print(request.data['category'])
        return Response(status=status.HTTP_204_NO_CONTENT)


    serializer_class = NewPostSerializer

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
