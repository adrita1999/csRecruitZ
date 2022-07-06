from django.shortcuts import render,HttpResponse
from .models import Jobpost
from .serializers import postSerializer
from  rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets


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
