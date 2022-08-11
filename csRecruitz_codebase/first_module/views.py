from django.http import JsonResponse
from django.shortcuts import render, HttpResponse, redirect
from .models import *
from .serializers import *
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework import viewsets, status
from django.db.models import Q
from datetime import datetime


class postViewsets(viewsets.ModelViewSet):
    # def list(self,request):
    #     posts = Jobpost.objects.all()
    #     serializer = postSerializer(posts, many=True)
    #     return Response(serializer.data)
    queryset = Jobpost.objects.all()
    serializer_class = postSerializer


class postViewsets_for_jobpost(viewsets.ModelViewSet):
    queryset = NewJobpost.objects.all()
    serializer_class = NewPostSerializer
    cat = ""
    org = ""
    loc = ""
    keyword = ""
    nature = ""
    redir_from_home= "true"
    filtername=""
    filter_cat=""
    objs = NewJobpost.objects.none()

    @action(methods=['post', 'get'], detail=False, url_path='searchinput')
    def follow(self, request):

        if request.method == 'POST':
            if request.data['redir_from_home']=="true":
                print(request.data['category'])
                print(request.data['organization'])
                print(request.data['location'])
                print(request.data['keyword'])
                print(request.data['nature'])
                postViewsets_for_jobpost.cat = request.data['category']
                postViewsets_for_jobpost.org = request.data['organization']
                postViewsets_for_jobpost.loc = request.data['location']
                postViewsets_for_jobpost.keyword = request.data['keyword']
                postViewsets_for_jobpost.nature = request.data['nature']
                postViewsets_for_jobpost.redir_from_home = request.data['redir_from_home']
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                postViewsets_for_jobpost.redir_from_home = request.data['redir_from_home']
                postViewsets_for_jobpost.filtername = request.data["filtername"]
                if request.data['filtername']=="cat":
                    postViewsets_for_jobpost.filter_cat =request.data["category"]
                return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            if postViewsets_for_jobpost.redir_from_home=="true":
                print("home theke asche")
                if postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature != "" and postViewsets_for_jobpost.org != "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat),
                                                     Q(employer_id__division=postViewsets_for_jobpost.loc),
                                                     Q(employer_id__org_type=postViewsets_for_jobpost.org),
                                                     Q(job_nature=postViewsets_for_jobpost.nature), (
                                                             Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         category__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         job_nature=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         application_process__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__name__icontains=postViewsets_for_jobpost.keyword)))

                elif postViewsets_for_jobpost.cat == "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature != "" and postViewsets_for_jobpost.org != "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(employer_id__division=postViewsets_for_jobpost.loc),
                                                     Q(employer_id__org_type=postViewsets_for_jobpost.org),
                                                     Q(job_nature=postViewsets_for_jobpost.nature), (
                                                             Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         category__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         job_nature=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         application_process__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword == "" and postViewsets_for_jobpost.nature != "" and postViewsets_for_jobpost.org != "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat),
                                                     Q(employer_id__division=postViewsets_for_jobpost.loc),
                                                     Q(employer_id__org_type=postViewsets_for_jobpost.org),
                                                     Q(job_nature=postViewsets_for_jobpost.nature))
                elif postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org != "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat),
                                                     Q(employer_id__division=postViewsets_for_jobpost.loc),
                                                     Q(employer_id__org_type=postViewsets_for_jobpost.org),
                                                     (
                                                             Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         category__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         job_nature=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         application_process__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature != "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat),
                                                     Q(employer_id__division=postViewsets_for_jobpost.loc),

                                                     Q(job_nature=postViewsets_for_jobpost.nature), (
                                                             Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         category__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         job_nature=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         application_process__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature != "" and postViewsets_for_jobpost.org != "" and postViewsets_for_jobpost.loc == "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat),

                                                     Q(employer_id__org_type=postViewsets_for_jobpost.org),
                                                     Q(job_nature=postViewsets_for_jobpost.nature), (
                                                             Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         category__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         job_nature=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         application_process__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat == "" and postViewsets_for_jobpost.keyword == "" and postViewsets_for_jobpost.nature != "" and postViewsets_for_jobpost.org != "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(
                        Q(employer_id__division=postViewsets_for_jobpost.loc),
                        Q(employer_id__org_type=postViewsets_for_jobpost.org),
                        Q(job_nature=postViewsets_for_jobpost.nature))
                elif postViewsets_for_jobpost.cat == "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org != "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(
                        Q(employer_id__division=postViewsets_for_jobpost.loc),
                        Q(employer_id__org_type=postViewsets_for_jobpost.org),
                        (
                                Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                            category__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                            job_nature=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                            edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                            application_process__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat == "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature != "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(
                        Q(employer_id__division=postViewsets_for_jobpost.loc),

                        Q(job_nature=postViewsets_for_jobpost.nature), (
                                Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                            category__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                            job_nature=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                            edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                            application_process__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat == "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature != "" and postViewsets_for_jobpost.org != "" and postViewsets_for_jobpost.loc == "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(
                        Q(employer_id__org_type=postViewsets_for_jobpost.org),
                        Q(job_nature=postViewsets_for_jobpost.nature), (
                                Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                            category__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                            job_nature=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                            edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                            application_process__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword == "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org != "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat),
                                                     Q(employer_id__division=postViewsets_for_jobpost.loc),
                                                     Q(employer_id__org_type=postViewsets_for_jobpost.org))

                elif postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword == "" and postViewsets_for_jobpost.nature != "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat),
                                                     Q(employer_id__division=postViewsets_for_jobpost.loc),

                                                     Q(job_nature=postViewsets_for_jobpost.nature))
                elif postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword == "" and postViewsets_for_jobpost.nature != "" and postViewsets_for_jobpost.org != "" and postViewsets_for_jobpost.loc == "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat),

                                                     Q(employer_id__org_type=postViewsets_for_jobpost.org),
                                                     Q(job_nature=postViewsets_for_jobpost.nature))
                elif postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat),
                                                     Q(employer_id__division=postViewsets_for_jobpost.loc),
                                                     (
                                                             Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         category__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         job_nature=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         application_process__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org != "" and postViewsets_for_jobpost.loc == "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat),

                                                     Q(employer_id__org_type=postViewsets_for_jobpost.org),
                                                     (
                                                             Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         category__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         job_nature=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         application_process__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature != "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc == "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat),

                                                     Q(job_nature=postViewsets_for_jobpost.nature), (
                                                             Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         category__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         job_nature=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         application_process__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat == "" and postViewsets_for_jobpost.keyword == "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org != "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(
                        Q(employer_id__division=postViewsets_for_jobpost.loc),
                        Q(employer_id__org_type=postViewsets_for_jobpost.org))
                elif postViewsets_for_jobpost.cat == "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(
                        Q(employer_id__division=postViewsets_for_jobpost.loc),
                        (
                                Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                            category__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                            job_nature=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                            edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                            application_process__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat == "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature != "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc == "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(

                        Q(job_nature=postViewsets_for_jobpost.nature), (
                                Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                            category__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                            job_nature=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                            edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                            application_process__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat == "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(
                        Q(employer_id__division=postViewsets_for_jobpost.loc),
                        (
                                Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                            category__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                            job_nature=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                            edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                            application_process__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat == "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org != "" and postViewsets_for_jobpost.loc == "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(

                        Q(employer_id__org_type=postViewsets_for_jobpost.org),
                        (
                                Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                            category__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                            job_nature=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                            edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                            application_process__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat == "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature != "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc == "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(

                        Q(job_nature=postViewsets_for_jobpost.nature), (
                                Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                            category__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                            job_nature=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                            edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                            application_process__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword == "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat),
                                                     Q(employer_id__division=postViewsets_for_jobpost.loc))
                elif postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword == "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org != "" and postViewsets_for_jobpost.loc == "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat),

                                                     Q(employer_id__org_type=postViewsets_for_jobpost.org))
                elif postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword == "" and postViewsets_for_jobpost.nature != "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc == "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat),

                                                     Q(job_nature=postViewsets_for_jobpost.nature))
                elif postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc == "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat),
                                                     (
                                                             Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         category__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         job_nature=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         application_process__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat == "" and postViewsets_for_jobpost.keyword == "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(
                        Q(employer_id__division=postViewsets_for_jobpost.loc)
                    )
                elif postViewsets_for_jobpost.cat == "" and postViewsets_for_jobpost.keyword == "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org != "" and postViewsets_for_jobpost.loc == "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(employer_id__org_type=postViewsets_for_jobpost.org))
                elif postViewsets_for_jobpost.cat == "" and postViewsets_for_jobpost.keyword == "" and postViewsets_for_jobpost.nature != "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc == "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(

                        Q(job_nature=postViewsets_for_jobpost.nature))
                elif postViewsets_for_jobpost.cat == "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc == "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(
                        Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                            category__icontains=postViewsets_for_jobpost.keyword)
                        | Q(
                            job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                            job_nature=postViewsets_for_jobpost.keyword)
                        | Q(
                            job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                            edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                        | Q(
                            additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                            application_process__icontains=postViewsets_for_jobpost.keyword)
                        | Q(
                            employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                        | Q(
                            employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                        | Q(
                            employer_id__name__icontains=postViewsets_for_jobpost.keyword))
                elif postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword == "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc == "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat))
                else:
                    postViewsets_for_jobpost.objs = NewJobpost.objects.all()
                serializer = NewPostSerializer(postViewsets_for_jobpost.objs, many=True)
                return Response({
                    'status': status.HTTP_204_NO_CONTENT,
                    'data': serializer.data,

                })
            else:
                print("filter theke asche")
                objs2=postViewsets_for_jobpost.objs
                if postViewsets_for_jobpost.filter_cat!="":
                    objs2=postViewsets_for_jobpost.objs.filter(category=postViewsets_for_jobpost.filter_cat)
                print(objs2)
                serializer = NewPostSerializer(objs2, many=True)
                return Response({
                    'status': status.HTTP_204_NO_CONTENT,
                    'data': serializer.data,
                })



class usercontactViewsets(viewsets.ModelViewSet):
    queryset = UserContact.objects.all()
    serializer_class = usercontactSerializer


class jobseekerViewsets(viewsets.ModelViewSet):
    queryset = Jobseeker.objects.all()
    serializer_class = jobseekerSerializer
    isdetails = False
    email = ""
    password = ""

    @action(methods=['post', 'get'], detail=False, url_path='matchuser')
    def match(self, request):
        if request.method == 'POST':
            jobseekerViewsets.isdetails = True
            jobseekerViewsets.email = request.data['email']
            jobseekerViewsets.password = request.data['password']
            return Response(status=status.HTTP_204_NO_CONTENT)

        else:
            if jobseekerViewsets.isdetails == True:
                print(jobseekerViewsets.email)
                print(jobseekerViewsets.password)
                objs = Jobseeker.objects.filter(email=jobseekerViewsets.email, password=jobseekerViewsets.password)
                str = ""
                if len(objs) == 1:
                    str = "success"
                else:
                    str = "fail"
                serializer = jobseekerSerializer(objs, many=True)
                jobseekerViewsets.isdetails = False
                return Response({
                    'status': status.HTTP_204_NO_CONTENT,
                    'data': serializer.data,
                    'response': str,

                })
            else:
                jobseekerViewsets.isdetails = False
                return Response({
                    'status': status.HTTP_204_NO_CONTENT,
                    'data': None,
                    'response': "not_submitted",

                })

    @action(methods=['post', 'get'], detail=False, url_path='adduser')
    def register(self, request):
        if request.method == 'POST':
            print(request.data['email'])
        return Response(status=status.HTTP_204_NO_CONTENT)


class recoViewsets(viewsets.ModelViewSet):
    #null ar open to dekhte hobe
    userid = 1
    user = Jobseeker.objects.filter(user_id=userid)
    usercat = user[0].field  # not null
    userloc = user[0].division  # not null
    usersal = user[0].pref_sal ####null kina dekhte hobe
    userntr = user[0].pref_job_ntr ####null kina dekhte hobe
    userorg = user[0].pref_org_type ####null kina dekhte hobe
    todaydate = datetime.today().strftime('%Y-%m-%d')

    total_user_exp = 0
    all_exp = JobExperience.objects.filter(user_id=userid)
    hasexp=False
    if len(all_exp)>0:
        hasexp=True
    for exp in all_exp:
        expval = exp.to_year - exp.from_year
        total_user_exp = total_user_exp + expval
    print("total_user_exp:"+str(total_user_exp))

    uskill = JobSeekerSkill.objects.filter(user_id=userid)
    hasuskill = False
    if len(uskill) > 0:
        hasuskill = True
    # print("user skills: ")
    # print(uskill)

    # queryset = NewJobpost.objects.filter(category = usercat, employer_id__division = userloc, deadline_date__gte=todaydate, job_nature = userntr, salary__gte = usersal, employer_id__org_type = userorg).order_by('-salary')
    # queryset = NewJobpost.objects.filter(salary__gte=usersal,job_nature=userntr).order_by('-salary')
    # qset = NewJobpost.objects.filter(deadline_date__gte=todaydate).order_by('deadline_date')
    qset=NewJobpost.objects.none()
    if usersal==None and userntr==None and userorg==None:
        qset = NewJobpost.objects.filter(category=usercat, employer_id__division=userloc, deadline_date__gte=todaydate)
    elif usersal==None and userntr==None:
        qset = NewJobpost.objects.filter(category=usercat, employer_id__division=userloc, deadline_date__gte=todaydate, employer_id__org_type=userorg)
    elif userntr==None and userorg==None:
        qset = NewJobpost.objects.filter(category=usercat, employer_id__division=userloc, deadline_date__gte=todaydate, salary__gte=usersal)
    elif usersal==None and userorg==None:
        qset = NewJobpost.objects.filter(category=usercat, employer_id__division=userloc, deadline_date__gte=todaydate, job_nature=userntr)
    elif usersal==None:
        qset = NewJobpost.objects.filter(category=usercat, employer_id__division=userloc, deadline_date__gte=todaydate,
                                         job_nature=userntr, employer_id__org_type=userorg)
    elif userntr==None:
        qset = NewJobpost.objects.filter(category=usercat, employer_id__division=userloc, deadline_date__gte=todaydate,
                                         salary__gte=usersal, employer_id__org_type=userorg)
    elif userorg==None:
        qset = NewJobpost.objects.filter(category=usercat, employer_id__division=userloc, deadline_date__gte=todaydate,
                                         job_nature=userntr, salary__gte=usersal)
    else:
        qset = NewJobpost.objects.filter(category = usercat, employer_id__division = userloc, deadline_date__gte=todaydate, job_nature = userntr, salary__gte = usersal, employer_id__org_type = userorg)
    print("filtered jobs0.1:")
    print("user skills: ")
    print(uskill)

    queryset = NewJobpost.objects.filter(category = usercat, employer_id__division = userloc, deadline_date__gte=todaydate, job_nature = userntr, salary__gte = usersal, employer_id__org_type = userorg).order_by('-salary')
    queryset = NewJobpost.objects.filter(salary__gte=usersal,job_nature=userntr).order_by('-salary')
    qset = NewJobpost.objects.filter(deadline_date__gte=todaydate).order_by('deadline_date')
    qset = NewJobpost.objects.filter(category = usercat, employer_id__division = userloc, deadline_date__gte=todaydate, job_nature = userntr, salary__gte = usersal, employer_id__org_type = userorg)
    print("filtered jobs0:")
    print(qset)
    valid_job_ids = []
    for q in qset:
        print("job id:"+str(q.jobpost_id))
        jobid=q.jobpost_id
        required_exp=q.required_experience
        # print("req_exp:" + str(required_exp))
        if(total_user_exp>=required_exp):
            jskill=JobSkill.objects.filter(jobpost_id=jobid)
            hasjskill = False
            if len(jskill) > 0:
                hasjskill = True
            # print("job skills: ")
            # print(jskill)
            match_out=True
            for js in jskill:
                jsid=js.skill_id
                match_in=False
                for us in uskill:
                    if us.skill_id==jsid:
                        match_in=True
                        break
                if match_in==False:
                    match_out=False
                    break
            if match_out==True:
                valid_job_ids.append(q.jobpost_id)
    print("filtered jobs0.2:")
    print(valid_job_ids)
    if len(valid_job_ids)<5:
        print("list choto hoise after first filtering")

        totjobs=len(valid_job_ids)
        qset2=NewJobpost.objects.filter(category = usercat, employer_id__division = userloc, deadline_date__gte=todaydate).order_by('-salary')
        for q2 in qset2:
            if totjobs<5:
                if not q2.jobpost_id in valid_job_ids:
                    valid_job_ids.append(q2.jobpost_id)
                    totjobs = totjobs + 1
            else:
                break
        print("filtered jobs1:")
        print(valid_job_ids)
        if len(valid_job_ids) < 5:
            print("list choto hoise after second filtering")
            totjobs2 = len(valid_job_ids)
            qset3 = NewJobpost.objects.filter(deadline_date__gte=todaydate).order_by('-salary')
            # print("qset3 length: "+str(len(qset3)))
            for q3 in qset3:
                if totjobs2 < 5:
                    if not q3.jobpost_id in valid_job_ids:
                        valid_job_ids.append(q3.jobpost_id)
                        totjobs2=totjobs2+1
                else:
                    break
            print("filtered jobs2:")
            print(valid_job_ids)
    queryset = NewJobpost.objects.filter(jobpost_id__in=valid_job_ids).order_by('-salary')
    print("final jobs:")
    print(queryset)
    serializer_class = NewPostSerializer
    # open to   !!!
    # preferred sal
    # pref nature
    # pref org

    # location
    # exp       !!!
    # category
    # deadline par hoise kina


class jobexpViewsets(viewsets.ModelViewSet):
    queryset = JobExperience.objects.filter().order_by('-from_year')
    serializer_class = jobexpSerializer


class uskillViewsets(viewsets.ModelViewSet):
    queryset = JobSeekerSkill.objects.filter(user_id=1)
    serializer_class = uskillSerializer


user1 = Jobseeker(user_id=1, name="Adrita Hossain Nakshi", email="adrita_99@yahoo.com", password="1234", thana="Lalbag",
                  district="Dhaka", division="Dhaka", father_name="Dr. Md. Elias Hossain",
                  mother_name="Dr. Zennat Ferdousi", date_of_birth="1999-02-06",
                  self_desc="I am a CS under-graduate. I love programmimg and I love computers too. Like Steve Jobs, I like to believe 'Everybody should learn to program a computer, because it teaches you how to think.'",
                  nationality="Bangladeshi", nid_number="12345678", field="Research", pref_sal="30000",
                  pref_job_ntr="Full-time", pref_org_type="NGO", propic="propics_input/nakshi.jpg",
                  resume="resumes_input/nakshi.docx")
user1.save()
user2 = Jobseeker(user_id=2, name="Simantika Bhattacharjee Dristi", email="1705029@ugrad.cse.buet.ac.bd", password="1234", thana="Lalbag",
                  district="Dhaka", division="Dhaka", father_name="Pintu Bhattacharjee",
                  mother_name="Soma Chowdhury", date_of_birth="1998-01-21",
                  self_desc="I am a CS under-graduate. I believe in hardwork. CSE is my first love and my one and only passion.",
                  nationality="Bangladeshi", nid_number="12349876", field="Research and Development", propic="propics_input/nakshi.jpg",
                  resume="resumes_input/nakshi.docx")
user2.save()
emp1 = Employer(user_id=2, name="Optimizely", email="optimizely@gmail.com", password="1234", district="Dhaka",
                division="Dhaka", org_type="NGO", establishment_year="2005")
emp1.save()
emp2 = Employer(user_id=3, name="Kona SL", email="kona@yahoo.com", password="1234", district="Kishoreganj",
                division="Dhaka",
                org_type="NGO", establishment_year="2001")
emp2.save()
emp3 = Employer(user_id=4, name="Data Edge Ltd", email="dataedge@gmail.com", password="1234", district="Sunamganj",
                division="Sylhet", org_type="NGO", establishment_year="1996")
emp3.save()
emp4 = Employer(user_id=5, name="Samsung", email="samsung@gmail.com", password="1234", district="Cox's Bazar",
                division="Chattogram", org_type="NGO", establishment_year="1981")
emp4.save()
emp5 = Employer(user_id=6, name="Intelligent Machines Limited", email="iml@gmail.com", password="1234",
                district="Rangpur", division="Rangpur", org_type="NGO", establishment_year="2015")
emp5.save()
emp6 = Employer(user_id=7, name="BEPRC", email="beprc@gmail.com", password="1234", district="Netrokona",
                division="Mymensingh",
                org_type="Government", establishment_year="1998")
emp6.save()
emp7 = Employer(user_id=8, name="Bangladesh Airforce", email="airbd@gmail.com", password="1234", district="Bogura",
                division="Rajshahi", org_type="Government", establishment_year="1975")
emp7.save()
contact1 = UserContact(user_contact_id=1, user_id=1, contact_no="01878046439")
contact1.save()
contact2 = UserContact(user_contact_id=2, user_id=1, contact_no="01718464397")
contact2.save()
skill1 = Skill(skill_id=1, skill_name="Python", gap_between_consecutive_attempts=30)
skill1.save()
skill2 = Skill(skill_id=2, skill_name="C++", gap_between_consecutive_attempts=30)
skill2.save()
skill3 = Skill(skill_id=3, skill_name="Angular", gap_between_consecutive_attempts=30)
skill3.save()
skill4 = Skill(skill_id=4, skill_name="Django", gap_between_consecutive_attempts=30)
skill4.save()
skill5 = Skill(skill_id=5, skill_name="Java", gap_between_consecutive_attempts=30)
skill5.save()
skill6 = Skill(skill_id=6, skill_name="ReactJS", gap_between_consecutive_attempts=30)
skill6.save()
skill7 = Skill(skill_id=7, skill_name="PostgreSQL", gap_between_consecutive_attempts=30)
skill7.save()
skill8 = Skill(skill_id=8, skill_name="Flask", gap_between_consecutive_attempts=30)
skill8.save()
skill9 = Skill(skill_id=9, skill_name="C", gap_between_consecutive_attempts=30)
skill9.save()
skill10 = Skill(skill_id=10, skill_name="JavaFX", gap_between_consecutive_attempts=30)
skill10.save()
skill11 = Skill(skill_id=11, skill_name="NodeJS", gap_between_consecutive_attempts=30)
skill11.save()
skill12 = Skill(skill_id=12, skill_name="Bash", gap_between_consecutive_attempts=30)
skill12.save()
skill13 = Skill(skill_id=13, skill_name="C#", gap_between_consecutive_attempts=30)
skill13.save()
skill14 = Skill(skill_id=14, skill_name="MongoDB", gap_between_consecutive_attempts=30)
skill14.save()
skill15 = Skill(skill_id=15, skill_name="PHP", gap_between_consecutive_attempts=30)
skill15.save()
skill16 = Skill(skill_id=16, skill_name="Laravel", gap_between_consecutive_attempts=30)
skill16.save()
skill17 = Skill(skill_id=17, skill_name="JQuery", gap_between_consecutive_attempts=30)
skill17.save()
skill18 = Skill(skill_id=18, skill_name="MySQL", gap_between_consecutive_attempts=30)
skill18.save()
skill19 = Skill(skill_id=19, skill_name="Swift", gap_between_consecutive_attempts=30)
skill19.save()
skill20 = Skill(skill_id=20, skill_name="PL/SQL", gap_between_consecutive_attempts=30)
skill20.save()
jobpost1 = NewJobpost(jobpost_id=1, employer_id=emp1, title="Senior Software Engineer",
                      category="Research and Development", post_date="2022-06-28", deadline_date="2022-09-28",
                      salary=55000, required_experience=5, vacancies=2,
                      job_context="We are looking for a Sr. Software Engineer who will able to produce scalable software solutions. Selected Candidate will be the part of a cross-functional team that’s responsible for the full software development life cycle, from conception to deployment. As a Sr. Software Engineer, Candidate should be comfortable around both front-end and back-end coding languages, development frameworks and third-party libraries. Candidate should also be a team player with a knack for visual design and utility.",
                      job_nature="Full-time",
                      job_responsibilities="Work with development teams and product managers to ideate software solutions. Design client-side and server-side architecture",
                      edu_requirement="M.Sc/ B.Sc in Computer Science & Engineering or relevant degree from any reputed University",
                      additional_requirements="Work experience as a Full Stack Developer or similar role.",
                      application_process=" Email your CV from MY BDJOBS account.")
jobpost1.save()
jskill1 = JobSkill(job_skill_id=1,jobpost_id=jobpost1,skill_id=skill1)
jskill1.save()
jskill2 = JobSkill(job_skill_id=2,jobpost_id=jobpost1,skill_id=skill4)
jskill2.save()
jobpost2 = NewJobpost(jobpost_id=2, employer_id=emp2, title="Software Developer", category="Research and Development",
                      post_date="2022-06-26", deadline_date="2022-09-26", salary=50000, required_experience=3,
                      vacancies=2,
                      job_context="We are looking for a .NET Software Engineer to join our development team. The selected software engineers will get a chance to work with the latest technology stacks, exercising industry-standard principles & best practices to build scalable, high performance & robust software solutions.",
                      job_nature="Full-time",
                      job_responsibilities=" Good knowledge and understanding of ASP.NET Web Services, Restful Web APIs, OData, Entity Framework, Asynchronous Programming in C#, LINQ, Lambdas, Func, Action, Routing, Model Binding, MSSQL, MongoDb, etc.",
                      edu_requirement="Bachelor of Science (BSc) in Computer Science & Engineering, Bachelor of Computer Application (BCA) in Computer Applications",
                      additional_requirements="Age at least 24 years",
                      application_process="*Photograph must be enclosed with the resume.")
jobpost2.save()
jskill3 = JobSkill(job_skill_id=3,jobpost_id=jobpost2,skill_id=skill2)
jskill3.save()
jskill4 = JobSkill(job_skill_id=4,jobpost_id=jobpost2,skill_id=skill9)
jskill4.save()
jskill5 = JobSkill(job_skill_id=5,jobpost_id=jobpost2,skill_id=skill13)
jskill5.save()
jskill6 = JobSkill(job_skill_id=6,jobpost_id=jobpost2,skill_id=skill14)
jskill6.save()
jobpost3 = NewJobpost(jobpost_id=3, employer_id=emp3, title="Junior Software Engineer",
                      category="Research and Development", post_date="2022-07-10", deadline_date="2022-08-10",
                      salary=50000, required_experience=3, vacancies=3,
                      job_context="AMBER GROUP invites applications for recruitment in the position:",
                      job_nature="Full-time",
                      job_responsibilities="Excellent working knowledge in Asp.Net, Asp.net MVC, WCF, Web API, LINQ, Entity Framework .Net Core",
                      edu_requirement="B.Sc in Computer Science or Software Engineering from any reputed university.",
                      additional_requirements="The applicants should have experience in the following business area(s): Software Company",
                      application_process=" Send your CV to resume@amber.com.bd")
jobpost3.save()
jskill7 = JobSkill(job_skill_id=7,jobpost_id=jobpost3,skill_id=skill4)
jskill7.save()
jobpost4 = NewJobpost(jobpost_id=4, employer_id=emp4, title="Software Programmer ( Intern )", category="Programming",
                      post_date="2022-06-26", deadline_date="2022-09-26", salary=6000, required_experience=2,
                      vacancies=2,
                      job_context="In your CV you should share your leetcode.com username and GitHub user name.",
                      job_nature="Full-time",
                      job_responsibilities="Developing robust & user friendly secured web applications for managing the interchange of data between the server and the users.",
                      edu_requirement="Computer Science (CS)/ Bachelor of Science (B.Sc)/ Computer Science & Engineering (CSE)/ Software Engineering (SE) or any other relevant field.",
                      additional_requirements="Freshers are also encouraged to apply.",
                      application_process="*Photograph must be enclosed with the resume.")
jobpost4.save()
jskill8 = JobSkill(job_skill_id=8,jobpost_id=jobpost4,skill_id=skill1)
jskill8.save()
jskill9 = JobSkill(job_skill_id=9,jobpost_id=jobpost4,skill_id=skill3)
jskill9.save()
jskill10 = JobSkill(job_skill_id=10,jobpost_id=jobpost4,skill_id=skill4)
jskill10.save()
jskill11 = JobSkill(job_skill_id=11,jobpost_id=jobpost4,skill_id=skill8)
jskill11.save()
jskill12 = JobSkill(job_skill_id=12,jobpost_id=jobpost4,skill_id=skill11)
jskill12.save()
jobpost5 = NewJobpost(jobpost_id=5, employer_id=emp5, title="Software Engineer (Android)", category="Research and Development",
                      post_date="2022-06-23", deadline_date="2022-07-23", salary=60000, required_experience=2,
                      vacancies=2,
                      job_context="We are looking for passionate Software Engineers in the Android platform having strong knowledge and proven experience of a minimum 2 years in developing native Android apps. The ideal candidate will be responsible for developing high-quality applications. They will also be responsible for designing and implementing testable and scalable code.",
                      job_nature="Full-time",
                      job_responsibilities="Analyze product requirements and propose solutions to them.",
                      edu_requirement="Bachelor's degree in Computer Science or related field.",
                      additional_requirements="Deep Knowledge of Object-Oriented Design and Implementation.",
                      application_process="Send your CV to career@braincraftapps.com")
jobpost5.save()
jskill13 = JobSkill(job_skill_id=13,jobpost_id=jobpost5,skill_id=skill5)
jskill13.save()
jskill14 = JobSkill(job_skill_id=14,jobpost_id=jobpost5,skill_id=skill10)
jskill14.save()
jobpost6 = NewJobpost(jobpost_id=6, employer_id=emp5, title="Software Engineer (Asp.net Core, Angular)",
                      category="DevOps",
                      post_date="2022-07-02", deadline_date="2022-09-02", salary=45000, required_experience=1,
                      vacancies=2,
                      job_context="As a Software Engineer, you will be working with the team on different client projects and internal products expanding different platforms. You will work on implementing new features while taking ownership of the product or service. You will be working in a collaborative team with a supporting atmosphere. You will be able to strengthen your area of expertise to have shared success.",
                      job_nature="Full-time",
                      job_responsibilities="Work on feature development for different client projects and internal products.",
                      edu_requirement="Bachelor of Science (BSc) in CSE",
                      additional_requirements="Minimum 1 year of hands-on experience in software development.",
                      application_process="Send your CV to contact@creativitix.com")
jobpost6.save()
jskill15 = JobSkill(job_skill_id=15,jobpost_id=jobpost6,skill_id=skill3)
jskill15.save()
jobpost7 = NewJobpost(jobpost_id=7, employer_id=emp2, title="Software Engineer", category="DevOps",
                      post_date="2022-06-28", deadline_date="2022-09-28", salary=40000, required_experience=1,
                      vacancies=2,
                      job_context="We are looking for a Software Engineer to build functional and efficient server-client applications in Python. Responsibilities include participating in all phases of the software development lifecycle and be a good team player. If you’re a seasoned developer with a love for back-end technologies, have keen eye for detail and have problem-solving skills then we’d like to meet you.",
                      job_nature="Full-time",
                      job_responsibilities="Build efficient back-end features in Python",
                      edu_requirement="Bachelor of Science (BSc) in CSE in any reputed university.",
                      additional_requirements="Experience with Python frameworks (e.g., Django, Flask, FastAPI)",
                      application_process="Apply online")
jobpost7.save()
jskill16 = JobSkill(job_skill_id=16,jobpost_id=jobpost7,skill_id=skill4)
jskill16.save()
jskill17 = JobSkill(job_skill_id=17,jobpost_id=jobpost7,skill_id=skill8)
jskill13.save()
jskill18 = JobSkill(job_skill_id=18,jobpost_id=jobpost7,skill_id=skill1)
jskill18.save()
jobpost8 = NewJobpost(jobpost_id=8, employer_id=emp1, title="Junior Software Engineer",
                      category="DevOps", post_date="2022-07-08", deadline_date="2022-09-08",
                      salary=55000, required_experience=5, vacancies=2,
                      job_context="We are looking for a Sr. Software Engineer who will able to produce scalable software solutions. Selected Candidate will be the part of a cross-functional team that’s responsible for the full software development life cycle, from conception to deployment. As a Sr. Software Engineer, Candidate should be comfortable around both front-end and back-end coding languages, development frameworks and third-party libraries. Candidate should also be a team player with a knack for visual design and utility.",
                      job_nature="Full-time",
                      job_responsibilities="Bachelor of Science (BSc) in CSE in any reputed university.",
                      edu_requirement="M.Sc/ B.Sc in Computer Science & Engineering or relevant degree from any reputed University",
                      additional_requirements="Work experience as a Full Stack Developer or similar role.",
                      application_process=" Email your CV from MY BDJOBS account.")
jobpost8.save()
jskill19 = JobSkill(job_skill_id=19,jobpost_id=jobpost8,skill_id=skill1)
jskill19.save()
jobpost9 = NewJobpost(jobpost_id=9, employer_id=emp2, title="Senior Software Engineer (PHP - Laravel, Codeigniter)",
                      category="Research and Development",
                      post_date="2022-06-26", deadline_date="2022-08-26", salary=30000, required_experience=3,
                      vacancies=4,
                      job_context="Technical Experience : Codeigniter, Laravel, jQuery, Ajax, Vue.js, Mysql.",
                      job_nature="Full-time",
                      job_responsibilities="Analysis, Coding, Problem Solving and Team Leading.",
                      edu_requirement="Bachelor of Science (BSc)",
                      additional_requirements="Should have experience to guide software engineer.",
                      application_process="*Photograph must be enclosed with the resume.")
jobpost9.save()

jskill20 = JobSkill(job_skill_id=20,jobpost_id=jobpost9,skill_id=skill15)
jskill20.save()
jskill21 = JobSkill(job_skill_id=21,jobpost_id=jobpost9,skill_id=skill16)
jskill21.save()
jskill22 = JobSkill(job_skill_id=22,jobpost_id=jobpost9,skill_id=skill17)
jskill22.save()
jskill23 = JobSkill(job_skill_id=23,jobpost_id=jobpost9,skill_id=skill18)
jskill23.save()

jobpost10 = NewJobpost(jobpost_id=10, employer_id=emp3, title="Senior Application Security Engineer",
                       category="Security", post_date="2022-07-10", deadline_date="2022-08-28",
                       salary=70000, required_experience=10, vacancies=4,
                       job_context="Job Grade: Senior Principal Officer to First Assistant Vice President",
                       job_nature="Full-time",
                       job_responsibilities="Perform Information Security Assessment of different ICT Systems, Services, Application and processes like Core Banking Applications, Payment Systems, Digital Banking Applications, Card Management System, SWIFT, Active Directory etc.",
                       edu_requirement="MSc/BSc in Computer Science, Information Systems, Information Technology or a related field from reputed University with No Third Division in academic records.",
                       additional_requirements="Minimum 10 year(s) working experience in relevant area",
                       application_process=" Apply online")
jobpost10.save()
jskill24 = JobSkill(job_skill_id=24,jobpost_id=jobpost10,skill_id=skill1)
jskill24.save()
jskill25 = JobSkill(job_skill_id=25,jobpost_id=jobpost10,skill_id=skill12)
jskill25.save()
jskill26 = JobSkill(job_skill_id=26,jobpost_id=jobpost10,skill_id=skill19)
jskill26.save()
jobpost11 = NewJobpost(jobpost_id=11, employer_id=emp4, title="Senior Software Engineer (Full Stack Java Developer)",
                       category="DevOps",
                       post_date="2022-06-29", deadline_date="2022-09-29", salary=4000, required_experience=1,
                       vacancies=5,
                       job_context="We are seeking an experienced, self-motivated Java engineer with 1+ years of experience in developing applications and 1+ technology experience.",
                       job_nature="Full-time",
                       job_responsibilities="Collaborates with the development team and initiates process improvements for new and existing systems.",
                       edu_requirement="Bachelor of Science (BSc) in CSE, IT, SE, Diploma in Engineering in Computer Science & Engineering",
                       additional_requirements="Requires 1+ years of hands-on experience in java and PL/SQL.",
                       application_process="*Photograph must be enclosed with the resume.")
jobpost11.save()
jskill27 = JobSkill(job_skill_id=27,jobpost_id=jobpost11,skill_id=skill5)
jskill27.save()
jskill28 = JobSkill(job_skill_id=28,jobpost_id=jobpost11,skill_id=skill10)
jskill28.save()
jskill29 = JobSkill(job_skill_id=29,jobpost_id=jobpost11,skill_id=skill20)
jskill29.save()
jobpost12 = NewJobpost(jobpost_id=12, employer_id=emp5, title=" Software Developer (Java) [MFSD- 20220616]",
                       category="Research and Development",
                       post_date="2022-06-23", deadline_date="2022-08-23", salary=45000, required_experience=1,
                       vacancies=2,
                       job_context="Developers need to compile detailed technical documentation and user assistance material, requiring excellent written communication.",
                       job_nature="Full-time",
                       job_responsibilities="Coding, testing and troubleshooting so that developed software performs as per requirements",
                       edu_requirement="Bachelor of Science (BSc) in CSE, Post Graduate Diploma (PGD) in Computer Science & Engineering",
                       additional_requirements="Age 25 to 40 years",
                       application_process="Apply online")
jobpost12.save()
jskill30 = JobSkill(job_skill_id=30,jobpost_id=jobpost12,skill_id=skill5)
jskill30.save()
jskill31 = JobSkill(job_skill_id=31,jobpost_id=jobpost12,skill_id=skill10)
jskill31.save()
jobpost13 = NewJobpost(jobpost_id=13, employer_id=emp1,
                       title="Senior Test Engineer/Test Engineer (Software), Capital Market Solutions",
                       category="Research and Development",
                       post_date="2022-07-05", deadline_date="2022-09-05", salary=65000, required_experience=2,
                       vacancies=2,
                       job_context="Test Engineer - We are seeking an experienced, self-motivated test engineer with 1+ years of experience in software testing and for Senior Test Engineer- Test engineer with 1+ years of experience in developing software and 3+ software testing experience. ",
                       job_nature="Full-time",
                       job_responsibilities="and internal products.",
                       edu_requirement="Bachelor of Science (BSc) in CSE",
                       additional_requirements="Minimum 1 year of hands-on experience in software development.",
                       application_process="Send your CV to contact@creativitix.com")
jobpost13.save()
jskill32 = JobSkill(job_skill_id=32,jobpost_id=jobpost13,skill_id=skill1)
jskill32.save()
jskill33 = JobSkill(job_skill_id=33,jobpost_id=jobpost13,skill_id=skill5)
jskill33.save()
jobpost14 = NewJobpost(jobpost_id=14, employer_id=emp5,
                       title="Senior Developer (Software)",
                       category="DevOps",
                       post_date="2022-06-30", deadline_date="2022-08-30", salary=50000, required_experience=3,
                       vacancies=3,
                       job_context="We are looking for a Software Engineer to build functional and efficient server-client applications in Python. Responsibilities include participating in all phases of the software development lifecycle and be a good team player. If you’re a seasoned developer with a love for back-end technologies, have keen eye for detail and have problem-solving skills then we’d like to meet you.",
                       job_nature="Full-time",
                       job_responsibilities="Automates test coverage per platform capabilities and requirements. Establishes and maintains continuous build and integration testing on applicable platforms and assists with manual system and integration testing efforts.",
                       edu_requirement="Bachelor of Computer Science & Engineering",
                       additional_requirements="Ability to communicate clearly and concisely, both orally and in writing.",
                       application_process="*Photograph must be enclosed with the resume.")
jobpost14.save()
jskill34 = JobSkill(job_skill_id=34,jobpost_id=jobpost14,skill_id=skill1)
jskill34.save()
jskill35 = JobSkill(job_skill_id=35,jobpost_id=jobpost14,skill_id=skill5)
jskill35.save()
question1 = Question(question_id=1, skill_id=skill1,
                     question_text="The library function exit( ) causes an exit from - ",
                     optionA="The program in which it occurs",
                     optionB="The function in which it occurs",
                     optionC="The block in which it occurs",
                     optionD="The loop in which it occurs",
                     answer="The program in which it occurs",
                     mark=10,
                     time_limit="00:01:30")
question1.save()
question2 = Question(question_id=2, skill_id=skill1, question_text="In a linked list - ",
                     optionA=" Each link contains data or a pointer to data",
                     optionB="Links are stored in an array",
                     optionC="A array of pointers point to the link",
                     optionD=" Each link contains a pointer to the next link",
                     answer=" Each link contains a pointer to the next link",
                     mark=10,
                     time_limit="00:01:30")
question2.save()
question3 = Question(question_id=3, skill_id=skill1,
                     question_text="In C++, which of the following can legitimately be passed to a function?",
                     optionA="A constant",
                     optionB="A variable",
                     optionC="A structure",
                     optionD="All of these",
                     answer="All of these",
                     mark=10,
                     time_limit="00:01:30")
question3.save()
question4 = Question(question_id=4, skill_id=skill1,
                     question_text="The dot operator connects which of the following two entities? ",
                     optionA=" Class object and member of that class",
                     optionB=" Class and member of that class",
                     optionC="Class object and a class",
                     optionD="Class member and class object",
                     answer="Class object and member of that class",
                     mark=10,
                     time_limit="00:01:30")
question4.save()
question5 = Question(question_id=5, skill_id=skill1, question_text="A static function -  ",
                     optionA="Should be called when an object is destroyed",
                     optionB="Can be called using the class name and function",
                     optionC="Is closely connected with an individual object of a class",
                     optionD=" Is used when a dummy object must be created",
                     answer=" Can be called using the class name and function",
                     mark=10,
                     time_limit="00:01:30")
question5.save()
job_exp1 = JobExperience(jobexperience_id=1, experience_name="Lecturer", organization_name="UIU", from_year="2017",
                         to_year="2018", user_id=user1)
job_exp1.save()
job_exp2 = JobExperience(jobexperience_id=2, experience_name="Lecturer", organization_name="Brac University",
                         from_year="2018", to_year="2021", user_id=user1)
job_exp2.save()

job_exp3 = JobExperience(jobexperience_id=3, experience_name="Lecturer", organization_name="North-South University",
                         from_year="2010", to_year="2017", user_id=user1)
job_exp3.save()
uskill1 = JobSeekerSkill(jobseeker_skill_id=1, isOpenToWork=True, skill_id=skill1, user_id=user1)
uskill1.save()
uskill2 = JobSeekerSkill(jobseeker_skill_id=2, isOpenToWork=False, skill_id=skill3, user_id=user1)
uskill2.save()
uskill3 = JobSeekerSkill(jobseeker_skill_id=3, isOpenToWork=True, skill_id=skill4, user_id=user1)
uskill3.save()
