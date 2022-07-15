from django.http import JsonResponse
from django.shortcuts import render, HttpResponse, redirect
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

jobpost3 = NewJobpost(jobpost_id=3, employer_id=emp3, title="Junior Software Engineer",
                      category="Teaching", post_date="2022-07-10", deadline_date="2022-08-10",
                      salary=50000, required_experience=3, vacancies=3,
                      job_context="AMBER GROUP invites applications for recruitment in the position:",
                      job_nature="Full-time",
                      job_responsibilities="Excellent working knowledge in Asp.Net, Asp.net MVC, WCF, Web API, LINQ, Entity Framework .Net Core",
                      edu_requirement="B.Sc in Computer Science or Software Engineering from any reputed university.",
                      additional_requirements="The applicants should have experience in the following business area(s): Software Company",
                      application_process=" Send your CV to resume@amber.com.bd")
jobpost3.save()
jobpost4 = NewJobpost(jobpost_id=4, employer_id=emp4, title="Software Developer ( Intern )", category="Programming",
                      post_date="2022-06-26", deadline_date="2022-07-26", salary=6000, required_experience=2,
                      vacancies=2,
                      job_context="In your CV you should share your leetcode.com username and GitHub user name.",
                      job_nature="Full-time",
                      job_responsibilities="Developing robust & user friendly secured web applications for managing the interchange of data between the server and the users.",
                      edu_requirement="Computer Science (CS)/ Bachelor of Science (B.Sc)/ Computer Science & Engineering (CSE)/ Software Engineering (SE) or any other relevant field.",
                      additional_requirements="Freshers are also encouraged to apply.",
                      application_process="*Photograph must be enclosed with the resume.")
jobpost4.save()
jobpost5 = NewJobpost(jobpost_id=5, employer_id=emp5, title="Software Engineer (Android)", category="Programming",
                      post_date="2022-06-23", deadline_date="2022-07-23", salary=60000, required_experience=1,
                      vacancies=2,
                      job_context="We are looking for passionate Software Engineers in the Android platform having strong knowledge and proven experience of a minimum 2 years in developing native Android apps. The ideal candidate will be responsible for developing high-quality applications. They will also be responsible for designing and implementing testable and scalable code.",
                      job_nature="Full-time",
                      job_responsibilities="Analyze product requirements and propose solutions to them.",
                      edu_requirement="Bachelor's degree in Computer Science or related field.",
                      additional_requirements="Deep Knowledge of Object-Oriented Design and Implementation.",
                      application_process="Send your CV to career@braincraftapps.com")
jobpost5.save()
jobpost6 = NewJobpost(jobpost_id=6, employer_id=emp6, title="Software Engineer (Asp.net Core, Angular)", category="DevOps",
                      post_date="2022-07-02", deadline_date="2022-08-02", salary=45000, required_experience=2,
                      vacancies=2,
                      job_context="As a Software Engineer, you will be working with the team on different client projects and internal products expanding different platforms. You will work on implementing new features while taking ownership of the product or service. You will be working in a collaborative team with a supporting atmosphere. You will be able to strengthen your area of expertise to have shared success.",
                      job_nature="Full-time",
                      job_responsibilities="Work on feature development for different client projects and internal products.",
                      edu_requirement="Bachelor of Science (BSc) in CSE",
                      additional_requirements="Minimum 1 year of hands-on experience in software development.",
                      application_process="Send your CV to contact@creativitix.com")
jobpost6.save()
jobpost7 = NewJobpost(jobpost_id=7, employer_id=emp7, title="Software Engineer", category="DevOps",
                      post_date="2022-06-28", deadline_date="2022-08-28", salary=40000, required_experience=1,
                      vacancies=2,
                      job_context="We are looking for a Software Engineer to build functional and efficient server-client applications in Python. Responsibilities include participating in all phases of the software development lifecycle and be a good team player. If you’re a seasoned developer with a love for back-end technologies, have keen eye for detail and have problem-solving skills then we’d like to meet you.",
                      job_nature="Full-time",
                      job_responsibilities="Build efficient back-end features in Python",
                      edu_requirement="Bachelor of Science (BSc) in CSE in any reputed university.",
                      additional_requirements="Experience with Python frameworks (e.g., Django, Flask, FastAPI)",
                      application_process="Apply online")
jobpost7.save()
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
    serializer_class = NewPostSerializer
    cat=""
    org=""
    loc=""

    # def listy(self):
    #     # if category != "none":
    #     #     query_set = NewJobpost.objects.all().filter(category__iexact=category)
    #     # else:
    #     #     query_set = NewJobpost.objects.all()
    #     query_set = NewJobpost.objects.all().filter(category__iexact="Teaching")
    #     print("bal")
    #     return Response(self.serializer_class(query_set, many=True).data,
    #                     status=status.HTTP_200_OK)




    @action(methods=['post','get'], detail=False ,url_path='searchinput')
    def follow(self, request):

        if request.method == 'POST':
            print(request.data['category'])
            print(request.data['organization'])
            print(request.data['location'])
            postViewsets_for_jobpost.cat=request.data['category']
            postViewsets_for_jobpost.org=request.data['organization']
            postViewsets_for_jobpost.loc=request.data['location']
            return Response(status=status.HTTP_204_NO_CONTENT)

        else :
            print(postViewsets_for_jobpost.cat)
            objs = NewJobpost.objects.filter(category=postViewsets_for_jobpost.cat,employer_id__division=postViewsets_for_jobpost.loc,
                                             employer_id__org_type=postViewsets_for_jobpost.org)

            serializer = NewPostSerializer(objs, many=True)
            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data': serializer.data,

                })



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
