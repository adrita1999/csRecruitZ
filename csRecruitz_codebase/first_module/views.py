from django.http import JsonResponse
from django.shortcuts import render, HttpResponse, redirect
from .models import *
from .serializers import *
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework import viewsets, status
from django.db.models import Q
from datetime import datetime
import hashlib
import random

is_logged_in=False

logged_in_id=-1

reg_id=-1
def make_pw_hash(password):
    return hashlib.sha256(str.encode(password)).hexdigest()

def check_pw_hash(password,hash):
    if make_pw_hash(password)==hash:
        return True
    return False
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
    filter_nat = ""
    filter_exp = ""
    filter_loc = ""
    sort_dir= ""
    sort_option= ""
    objs_keyword = NewJobpost.objects.none()

    @action(methods=['post', 'get'], detail=False, url_path='details')
    def jobdetails(self, request):
        global logged_in_id
        if request.method == 'POST':
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            jobs = NewJobpost.objects.all()
            serializer = NewPostSerializer(jobs, many=True)
            if logged_in_id == -1:
                string = "false"
            else:
                string = "true"
            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data': serializer.data,
                'response': string,
            })

    @action(methods=['post', 'get'], detail=False, url_path='searchinput')
    def follow(self, request):

        if request.method == 'POST':
            if request.data['redir_from_home']=="true": # home theke post hoise
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
                postViewsets_for_jobpost.filter_cat = request.data['category']
                postViewsets_for_jobpost.filter_nat = request.data['nature']
                postViewsets_for_jobpost.filter_loc = request.data['location']
                # print(postViewsets_for_jobpost.filter_loc)
                return Response(status=status.HTTP_204_NO_CONTENT)
            else: # filter theke post hoise
                postViewsets_for_jobpost.redir_from_home = request.data['redir_from_home']
                postViewsets_for_jobpost.filtername = request.data["filtername"]
                if request.data['filtername']=="cat":
                    postViewsets_for_jobpost.filter_cat =request.data["category"]
                if request.data['filtername']=="nat":
                    postViewsets_for_jobpost.filter_nat =request.data["nature"]
                if request.data['filtername']=="exp":
                    postViewsets_for_jobpost.filter_exp =request.data["req_exp"]
                if request.data['filtername'] == "loc":
                    postViewsets_for_jobpost.filter_loc = request.data["location"]
                if request.data['filtername'] == "sortbtn":
                    if request.data["asc"]== "true":
                        postViewsets_for_jobpost.sort_dir = "asc"
                    else:
                        postViewsets_for_jobpost.sort_dir = "desc"
                if request.data['filtername'] == "sortoption":
                    postViewsets_for_jobpost.sort_option = request.data["sortoption"]

                return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            if postViewsets_for_jobpost.redir_from_home=="true":
                print("home theke asche")
                # save search result for keyword
                if postViewsets_for_jobpost.keyword != "":
                    postViewsets_for_jobpost.objs_keyword = NewJobpost.objects.filter(
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
                else:
                    postViewsets_for_jobpost.objs_keyword = NewJobpost.objects.all()

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
                    'cat': postViewsets_for_jobpost.filter_cat,
                    'nat': postViewsets_for_jobpost.filter_nat,
                    'exp': postViewsets_for_jobpost.filter_exp,
                    'loc': postViewsets_for_jobpost.filter_loc,
                })
            else:
                print("filter theke asche")
                objs2=postViewsets_for_jobpost.objs_keyword
                if postViewsets_for_jobpost.filter_cat!="":
                    objs2=postViewsets_for_jobpost.objs_keyword.filter(category=postViewsets_for_jobpost.filter_cat)
                if postViewsets_for_jobpost.filter_nat!="":
                    objs2=objs2.filter(job_nature=postViewsets_for_jobpost.filter_nat)
                if postViewsets_for_jobpost.filter_exp!="":
                    if postViewsets_for_jobpost.filter_exp=="Upto 1 year":
                        objs2 = objs2.filter(required_experience__lte=1)
                    elif postViewsets_for_jobpost.filter_exp=="2-5 years":
                        objs2 = objs2.filter(required_experience__lte=5)
                        objs2 = objs2.filter(required_experience__gte=2)
                    else:
                        objs2 = objs2.filter(required_experience__gt=5)
                if postViewsets_for_jobpost.filter_loc!="":
                    objs2=objs2.filter(employer_id__division = postViewsets_for_jobpost.filter_loc)
                print(objs2)
                if postViewsets_for_jobpost.sort_option=="Most Recent Post":
                    if postViewsets_for_jobpost.sort_dir=="asc":
                        objs2 = objs2.filter().order_by('post_date')
                    else:
                        objs2 = objs2.filter().order_by('-post_date')
                elif postViewsets_for_jobpost.sort_option=="Deadline":
                    if postViewsets_for_jobpost.sort_dir=="asc":
                        objs2 = objs2.filter().order_by('deadline_date')
                    else:
                        objs2 = objs2.filter().order_by('-deadline_date')
                elif postViewsets_for_jobpost.sort_option=="Salary":
                    if postViewsets_for_jobpost.sort_dir=="asc":
                        objs2 = objs2.filter().order_by('salary')
                    else:
                        objs2 = objs2.filter().order_by('-salary')

                serializer = NewPostSerializer(objs2, many=True)
                return Response({
                    'status': status.HTTP_204_NO_CONTENT,
                    'data': serializer.data,
                    'cat': postViewsets_for_jobpost.filter_cat,
                    'nat': postViewsets_for_jobpost.filter_nat,
                    'exp': postViewsets_for_jobpost.filter_exp,
                    'loc': postViewsets_for_jobpost.filter_loc,
                })




class jobseekerViewsets(viewsets.ModelViewSet):
    queryset = Jobseeker.objects.all()
    serializer_class = jobseekerSerializer
    isdetails = False
    email = ""
    password = ""




    @action(methods=['post', 'get'], detail=False, url_path='matchuser')
    def match(self, request):
        global is_logged_in
        global logged_in_id
        if request.method == 'POST':
            jobseekerViewsets.isdetails = True
            jobseekerViewsets.email = request.data['email']
            jobseekerViewsets.password = request.data['password']
            objs = User.objects.filter(email=jobseekerViewsets.email)
            # global is_logged_in
            # global logged_in_id
            if len(objs) == 1:
                print("bal")
                hash_pass = objs[0].password
                # global is_logged_in
                # global logged_in_id
                if (check_pw_hash(jobseekerViewsets.password, hash_pass)):

                    is_logged_in = True

                    logged_in_id = objs[0].user_id
                else:
                    logged_in_id = -1
            else:
                logged_in_id = -1
                print("chal")
            return Response(status=status.HTTP_204_NO_CONTENT)

        else:
            if jobseekerViewsets.isdetails == True:
                print(jobseekerViewsets.email)
                print(jobseekerViewsets.password)
                objs = User.objects.filter(email=jobseekerViewsets.email)


                if len(objs) == 1:
                    hash_pass = objs[0].password
                    if(check_pw_hash(jobseekerViewsets.password,hash_pass)):
                        string = "success"
                        # global is_logged_in
                        is_logged_in=True
                        # global logged_in_id
                        logged_in_id=objs[0].user_id
                    else:
                        string="fail"
                else:
                    string = "fail"
                # global logged_in_id
                # if logged_in_id==-1:
                #     string="fail"
                # else:
                #     string="success"
                serializer = UserSerializer(objs, many=True)
                jobseekerViewsets.isdetails = False
                return Response({
                    'status': status.HTTP_204_NO_CONTENT,
                    'data': serializer.data,
                    'response': string,

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
            name=request.data['name']
            password=request.data['password']
            password=make_pw_hash(password)
            email = request.data['email']
            dob=request.data['dob']
            gender=""
            if request.data['gender']!="":
                gender=request.data['gender']
            else:
                gender=None
            mob=request.data['mob']
            nid=int(request.data['nid'])
            nat=request.data['nat']
            father=""
            if request.data['father']!="":
                father=request.data['father']
            else:
                father=None
            mother=""
            if request.data['mother']!="":
                mother=request.data['mother']
            else:
                mother=None
            desc=""
            if request.data['desc']!="":
                desc=request.data['desc']
            else:
                desc=None
            street=""
            if request.data['street']!="":
                street=request.data['street']
            else:
                street=None
            thana=""
            if request.data['thana']!="":
                thana = request.data['thana']
            else:
                thana=None
            dis=""
            if request.data['dis']!="":
                dis = request.data['dis']
            else :
                dis=None
            div = request.data['div']
            field=request.data['field']
            pref_org=""
            if request.data['pref_org']!="":
                pref_org=request.data['pref_org']
            else:
                pref_org=None
            pref_nat=""
            if request.data['pref_nat']!="":
                pref_nat=request.data['pref_nat']
            else:
                pref_nat=None
            pref_sal = ""
            if request.data['pref_sal'] != "":
                pref_sal = request.data['pref_sal']
            else:
                pref_sal = None
            if len(Jobseeker.objects.all())==0:
                id=0
            else:
                id=Jobseeker.objects.order_by('-user_id').first().user_id
            id=id+1
            global reg_id
            reg_id=id
            print(reg_id)
            user=Jobseeker(user_id=id,name=name,email=email,password=password,thana=thana,district=dis,division=div,father_name=father,
                           mother_name=mother,date_of_birth=dob,self_desc=desc,nationality=nat,nid_number=nid,field=field,pref_sal=pref_sal,
                           pref_job_ntr=pref_nat,pref_org_type=pref_org,gender=gender,contact_no=mob,street=street)
            user.save()
            print(request.data)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(methods=['post', 'get'], detail=False, url_path='addemp')
    def register(self, request):
        if request.method == 'POST':

            print(request.data)
            name = request.data['name']
            password = request.data['password']
            password = make_pw_hash(password)
            email = request.data['email']
            mob=request.data['mob']
            if request.data['est_year']!="":
                est_year=request.data['est_year']
            else:
                est_year=None
            org=request.data['org']
            street = ""
            if request.data['street'] != "":
                street = request.data['street']
            else:
                street = None
            thana = ""
            if request.data['thana'] != "":
                thana = request.data['thana']
            else:
                thana = None
            dis = ""
            if request.data['dis'] != "":
                dis = request.data['dis']
            else:
                dis = None
            div = request.data['div']
            if len(Employer.objects.all())==0:
                id=0
            else:
                id=Employer.objects.order_by('-user_id').first().user_id
            id=id+1

            employer=Employer(user_id=id,name=name,email=email,password=password,thana=thana,district=dis,division=div,contact_no=mob,street=street,establishment_year=est_year,org_type=org)
            employer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(methods=['post', 'get'], detail=False, url_path='get_info')
    def get_log_in(self, request):
        global logged_in_id

        if request.method == 'POST':
            logged_in_id=-1
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:

            if logged_in_id == -1:
                res = "No"
            else:
                res = "Yes"
            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data': None,
                'response': res,

            })

    @action(methods=['post', 'get'], detail=False, url_path='get_id')
    def get_id(self, request):
        # global logged_in_id
        print("logged_in "+str(logged_in_id))
        if request.method == 'GET':
            id = Jobseeker.objects.filter(user_ptr_id = logged_in_id)[0]

            print(id.name)
            serializer = jobseekerSerializer(id, many=False)
            print(serializer.data)
            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data': serializer.data,
                'response': "hi",

            })
        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, pk=None):
        data_in = request.data
        print(data_in)

        instance = self.get_object()
        print(instance.father_name)
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        # serializer.is_valid(raise_exception=True)

        if serializer.is_valid():
            # lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field
            # lookup_value = self.kwargs[lookup_url_kwarg]
            # extra_kwargs = {self.lookup_field: lookup_value}
            # serializer.save(**extra_kwargs)
            print("into")
            serializer.save()
            return Response(serializer.data)
        # data_out = serializer.data
        return Response(serializer.data, status=status.HTTP_201_CREATED)

        # @action(methods=['post', 'get','put'], detail=False, url_path='editinfo')
    # @action(detail=True, methods=['put'])
    # def update(self, request, pk=None):
        # if request.method == 'PUT':
        #     userid=1
        #     print(request.data['name'])
        #     print(request.data['age'])
        #     print(request.data['fathername'])
        #     print(request.data['mothername'])
        #     print(request.data['nationality'])
        #     print(request.data['nid'])
        #     print(request.data['dob'])
        #     print(request.data['mobile'])
        #     if request.data['nationality'] != "" :
        #         obj = Jobseeker.objects.filter(user_id=userid).update(nationality=request.data['nationality'])
        #         # obj.refresh_from_db()

        return Response(status=status.HTTP_204_NO_CONTENT)


class recoViewsets(viewsets.ModelViewSet):
    #null ar open to dekhte hobe
    global logged_in_id
    if logged_in_id==-1:
        userid=1
    else:
        userid = logged_in_id
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
    global logged_in_id
    ############################kora hoynaiiiii#############################33
    queryset = JobExperience.objects.all()
    serializer_class = jobexpSerializer

    @action(methods=['post', 'get'], detail=False, url_path='addexp')
    def add_exp(self, request):
        if request.method == 'POST':
            global reg_id
            des_list=request.data["des"].split("#")
            emp_list=request.data["emp"].split("#")
            from_list=request.data["from"].split("#")
            to_list=request.data["to"].split("#")
            desc_list = request.data["desc"].split("#")
            for i in range(len(des_list)):
                if len(JobExperience.objects.all())==0:
                    id=0
                else:
                    id = JobExperience.objects.order_by('-jobexperience_id').first().jobexperience_id
                id=id+1

                if desc_list[i]=="?":
                    description=None
                else:
                    description=desc_list[i]
                job_exp = JobExperience(jobexperience_id=id, experience_name=des_list[i], organization_name=emp_list[i],
                                         from_year=from_list[i],
                                         to_year=to_list[i],description=description, user_id_id=reg_id)
                job_exp.save()


            print(request.data)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            global logged_in_id
            objs = JobExperience.objects.filter(user_id=logged_in_id)
            serializer = jobexpSerializer(objs, many=True)
            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data': serializer.data,
            })



class uskillViewsets(viewsets.ModelViewSet):
    global logged_in_id
    queryset = JobSeekerSkill.objects.all()
    serializer_class = uskillSerializer

    @action(methods=['post', 'get'], detail=False, url_path='addskill')
    def add_skill(self, request):
        if request.method == 'POST':
            print(request.data)
            global reg_id
            print(reg_id)
            skill_list = request.data['skills'].split("#")

            open_to_list = request.data['open_to'].split("#")
            for i in range (1,len(skill_list)):
                if len(JobSeekerSkill.objects.all())==0:
                    id=0
                else:
                    id = JobSeekerSkill.objects.order_by('-jobseeker_skill_id').first().jobseeker_skill_id
                id=id+1
                if(skill_list[i] in open_to_list):
                    flag=True
                else:
                    flag=False
                print(skill_list[i])
                objs=Skill.objects.filter(skill_name=skill_list[i])

                uskill = JobSeekerSkill(jobseeker_skill_id=id, isOpenToWork=flag, skill_id_id=objs[0].skill_id, user_id_id=reg_id)
                uskill.save()
            name_list = request.data["proj_name"].split("#")
            link_list = request.data["proj_link"].split()
            desc_list = request.data["proj_desc"].split("#")

            for i in range(len(name_list)):
                if len(Project.objects.all()) == 0:
                    id = 0
                else:
                    id = Project.objects.order_by('-project_id').first().project_id
                id = id + 1

                if desc_list[i] == "?":
                    description = None
                else:
                    description = desc_list[i]
                if link_list[i]== "?" :
                    proj_link=None
                else:
                    proj_link=link_list[i]
                project = Project(project_id=id, project_name=name_list[i], project_link=proj_link,
                                        project_short_desc=description, user_id_id=reg_id)
                project.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            global logged_in_id
            print("koooooo" + str(logged_in_id))
            objs = JobSeekerSkill.objects.filter(user_id=logged_in_id)
            serializer = uskillSerializer(objs, many=True)
            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data': serializer.data,
            })




class publicationViewsets(viewsets.ModelViewSet):
    #######################kora hoynai###################################3
    queryset = Publication.objects.all()
    serializer_class = pub_Serializer

    @action(methods=['post', 'get'], detail=False, url_path='addpub')
    def add_pub(self,request):
        if request.method == 'POST':
            print(request.data)
            global reg_id
            pub_name_list = request.data["pub_name"].split("#")
            pub_link_list = request.data["pub_link"].split()
            lic_name_list = request.data["lic_name"].split("#")
            lic_org_list = request.data["lic_org"].split("#")

            for i in range(len(pub_name_list)):
                if len(Publication.objects.all()) == 0:
                    id = 0
                else:
                    id = Publication.objects.order_by('-publication_id').first().publication_id
                id = id + 1

                if pub_link_list[i] == "?":
                    link = None
                else:
                    link = pub_link_list[i]
                publi = Publication(publication_id=id,user_id_id=reg_id,publication_name=pub_name_list[i],publication_link=link)
                publi.save()

            for i in range(len(lic_name_list)):
                if len(LicenseCertificate.objects.all()) == 0:
                    id = 0
                else:
                    id = LicenseCertificate.objects.order_by('-certificate_id').first().certificate_id
                id = id + 1
                lic=LicenseCertificate(certificate_id=id,certificate_name=lic_name_list[i],issuing_org=lic_org_list[i])
                lic.save()
                if len(JobseekerCertificate.objects.all()) == 0:
                    id2 = 0
                else:
                    id2 = JobseekerCertificate.objects.order_by('-jobseeker_certificate_id').first().jobseeker_certificate_id
                id2=id2+1
                licuser=JobseekerCertificate(jobseeker_certificate_id=id2,certificate_id=lic,user_id_id=reg_id)
                licuser.save()

        return Response(status=status.HTTP_204_NO_CONTENT)

class projectViewsets(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = projSerializer
    @action(methods=['post', 'get'], detail=False, url_path='get_proj')
    def get_proj(self, request):
        if request.method == 'POST':
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            global logged_in_id
            objs = Project.objects.filter(user_id=logged_in_id)
            serializer = projSerializer(objs, many=True)

            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data': serializer.data,
            })

class pubViewsets(viewsets.ModelViewSet):
    queryset = Publication.objects.all()
    serializer_class = pub_Serializer

    @action(methods=['post', 'get'], detail=False, url_path='get_pub')
    def get_pub(self, request):
        if request.method == 'POST':
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            global logged_in_id
            objs = Publication.objects.filter(user_id=logged_in_id)
            serializer = pub_Serializer(objs, many=True)

            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data': serializer.data,
            })
class LicViewsets(viewsets.ModelViewSet):
    queryset = JobseekerCertificate.objects.all()
    serializer_class =LicSerializer

    @action(methods=['post', 'get'], detail=False, url_path='get_lic')
    def get_lic(self, request):
        if request.method == 'POST':
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            global logged_in_id
            objs = JobseekerCertificate.objects.filter(user_id=logged_in_id)
            serializer = LicSerializer(objs, many=True)

            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data': serializer.data,
            })
class applicationViewsets(viewsets.ModelViewSet):
    queryset = JobApplication.objects.all()
    serializer_class = applicationSerializer
    # stat="notapplied"
    global logged_in_id
    if logged_in_id!=-1:
        user_id=logged_in_id
    else:
        user_id = 1
    job_id = ""

    @action(methods=['post', 'get'], detail=False, url_path='getapplication')
    def apply(self, request):
        if request.method == 'POST':
            # print(request.data)
            if request.data['mount']=="true":#mount er shomoy post
                applicationViewsets.job_id = int(request.data['job_id'])
            else:#apply er somoy
                if request.data['type']=="apply":
                    allapplication = JobApplication.objects.all()
                    app_id = 1
                    if len(allapplication) == 0:
                        app_id = 1
                    else:
                        apps = JobApplication.objects.filter().order_by('-application_id')
                        #print(apps[0].application_id)
                        app_id = int(apps[0].application_id) + 1
                    now = datetime.now()
                    current_time = now.strftime("%H:%M:%S")
                    print("Current Time =", current_time)
                    todaydate = datetime.today().strftime('%Y-%m-%d')
                    print(app_id)
                    applicationViewsets.job_id=int(request.data['job_id'])
                    application = JobApplication(application_id=int(app_id), user_id_id=int(applicationViewsets.user_id), newjobpost_id_id=int(request.data['job_id']), apply_date=todaydate,apply_time=current_time)
                    application.save()
                else:
                    if request.data["ifshortlist"]=="false":
                        applicationViewsets.job_id = int(request.data['job_id'])
                        shortlist = JobShortlist.objects.filter(user_id_id=int(applicationViewsets.user_id), newjobpost_id_id=int(request.data['job_id']))
                        shortlist.delete()
                    else:
                        allshortlist=JobShortlist.objects.all()
                        sh_id=1
                        if len(allshortlist)==0:
                            sh_id=1
                        else:
                            lists=JobShortlist.objects.filter().order_by('-jobshortlist_id')
                            sh_id=int(lists[0].jobshortlist_id)+1
                        applicationViewsets.job_id = int(request.data['job_id'])
                        shortlist=JobShortlist(jobshortlist_id=int(sh_id),user_id_id=int(applicationViewsets.user_id), newjobpost_id_id=int(request.data['job_id']))
                        shortlist.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            str="notapplied"
            apps = JobApplication.objects.filter(newjobpost_id_id=int(applicationViewsets.job_id),user_id_id=int(applicationViewsets.user_id))
            print(apps)
            if len(apps)!=0:
                str="applied"

            str2 = "notshortlisted"
            sh = JobShortlist.objects.filter(newjobpost_id_id=int(applicationViewsets.job_id),
                                                 user_id_id=int(applicationViewsets.user_id))
            print(sh)
            if len(sh) != 0:
                str2 = "shortlisted"
            serializer = applicationSerializer(apps, many=True)
            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data':serializer.data,
                'response': str,
                'short':str2,
            })

class appliedjobViewsets(viewsets.ModelViewSet):
    global logged_in_id
    if logged_in_id != -1:
        user_id = logged_in_id
    else:
        user_id = 1
    queryset = JobApplication.objects.filter(user_id_id=user_id)
    serializer_class = applicationSerializer

class shortlistedjobViewsets(viewsets.ModelViewSet):
    user_id=1
    queryset = JobShortlist.objects.filter(user_id_id=user_id)
    serializer_class = shortlistSerializer
    job_id=""
    @action(methods=['post', 'get'], detail=False, url_path='shortlist')
    def shortlist(self, request):
        if request.method == 'POST':
            print(request.data["id"])
            shortlistedjobViewsets.job_id = request.data['id']
            shortlist = JobShortlist.objects.filter(user_id_id=int(shortlistedjobViewsets.user_id),
                                                    newjobpost_id_id=int(shortlistedjobViewsets.job_id))
            shortlist.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            jobs=JobShortlist.objects.filter(user_id_id=shortlistedjobViewsets.user_id)

            serializer = shortlistSerializer(jobs, many=True)
            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data': serializer.data,
            })


class questionViewsets(viewsets.ModelViewSet):
    ##################################kon skill er eta dekhate hobe################################
    skill_id = 2
    tempset=Question.objects.filter(skill_id=skill_id).order_by('?')

    #random.shuffle(tempset)
    id_list=[]
    count_1=0
    count_2=0
    flag_1=0
    for i in range(len(tempset)):
        if flag_1==0:
            if tempset[i].mark==1:
                if count_1==6:
                    flag_1=1
                else:
                    id_list.append(tempset[i].question_id)
                    count_1 = count_1 + 1
        if tempset[i].mark==2:
            if count_2==2 and flag_1==1:
                break
            else:
                id_list.append(tempset[i].question_id)
                count_2=count_2+1

    print("it is tempppp")
    queryset = Question.objects.filter(skill_id=skill_id,question_id__in=id_list)
    print(queryset)
    #random.shuffle(queryset)
    print(queryset)
    serializer_class = questionSerializer



    question_id = -1
    answer = ""
    total_num = 0

    @action(methods=['post', 'get'], detail=False, url_path='answer')
    def answer(self, request):
        global logged_in_id
        user_id = logged_in_id
        if request.method == 'POST':
            if request.data['type'] == "next":
                print("next theke ashche")
                question_id = request.data["question_id"]
                answer = request.data["answer"]
                print(request.data)

                obj = Question.objects.filter(question_id=question_id)
                correct_ans = obj[0].answer
                ques_mark = obj[0].mark
                print(correct_ans)

                if answer == correct_ans:
                    print("milse")
                    questionViewsets.total_num = questionViewsets.total_num + ques_mark
            else:  # finish
                print("finish theke ashche")
                question_id = request.data["question_id"]
                answer = request.data["answer"]
                print(request.data)

                obj = Question.objects.filter(question_id=question_id)
                correct_ans = obj[0].answer
                ques_mark = obj[0].mark
                print(correct_ans)

                if answer == correct_ans:
                    print("milse")
                    questionViewsets.total_num = questionViewsets.total_num + ques_mark
                print("final marks")
                print(questionViewsets.total_num)
                todaydate = datetime.today().strftime('%Y-%m-%d')
                allass = Assessment.objects.all()
                ass_id = 1
                if len(allass) == 0:
                    ass_id = 1
                else:
                    asses = Assessment.objects.filter().order_by('-assessment_id')
                    ass_id = int(asses[0].assessment_id) + 1
                jobseekerskill = JobSeekerSkill.objects.filter(user_id_id=user_id,
                                                               skill_id_id=questionViewsets.skill_id)
                print("js")
                print(user_id)
                print(questionViewsets.skill_id)
                print(jobseekerskill)
                jsid = jobseekerskill[0].jobseeker_skill_id
                assessment = Assessment(assessment_id=int(ass_id), marks_obtained=int(questionViewsets.total_num),
                                        jobseeker_skill_id_id=int(jsid), date=todaydate)
                assessment.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:

            todaydate = datetime.today().strftime('%Y-%m-%d')
            objs=SkillMarkCutoff.objects.filter(skill_id=questionViewsets.skill_id,from_date__lte=todaydate,to_date__gte=todaydate)
            per=objs[0].cutoff_percentage
            obtained_per=(questionViewsets.total_num/10)*100
            if obtained_per>=per:
                result="Passed"
            else:
                result="Failed"
            serializer = Cutoff_Serializer(objs, many=True)
            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data':serializer.data,
                'tot_mark': questionViewsets.total_num,
                'per': str(per),
                'res': result,

            })



pas_temp=make_pw_hash("1234")
user1 = Jobseeker(user_id=1, name="Adrita Hossain Nakshi", email="adrita_99@yahoo.com", password=pas_temp, thana="Lalbag",
                  district="Dhaka", division="Dhaka", father_name="Dr. Md. Elias Hossain",
                  mother_name="Dr. Zennat Ferdousi", date_of_birth="1999-02-06",
                  self_desc="I am a CS under-graduate. I love programmimg and I love computers too. Like Steve Jobs, I like to believe 'Everybody should learn to program a computer, because it teaches you how to think.'",
                  nationality="Bangladeshi", nid_number="12345678", field="Research", pref_sal="30000",
                  pref_job_ntr="Full-time", pref_org_type="NGO", propic="propics_input/nakshi.jpg",
                  resume="resumes_input/nakshi.docx")
user1.save()
user2 = Jobseeker(user_id=2, name="Simantika Bhattacharjee Dristi", email="1705029@ugrad.cse.buet.ac.bd", password=pas_temp, thana="Lalbag",
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

emp8 = Employer(user_id=9, name="Brac", email="brac@edu.bd", password="1234", district="Dhaka",
                division="Dhaka", org_type="NGO", establishment_year="1975")
emp8.save()
emp9 = Employer(user_id=10, name="UIU", email="uiu@edu.com", password="1234", district="Dhaka",
                division="Dhaka", org_type="NGO", establishment_year="2000")
emp9.save()
emp10 = Employer(user_id=11, name="Samsung", email="samsungrj@gmail.com", password="1234", district="Rajshahi",
                division="Rajshahi", org_type="Private Firm", establishment_year="2001")
emp10.save()
emp11 = Employer(user_id=12, name="Bangladesh Airforce", email="airbdrj@gmail.com", password="1234", district="Rajshahi",
                division="Rajshahi", org_type="Government", establishment_year="1990")
emp11.save()


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
jobpost15 = NewJobpost(jobpost_id=15, employer_id=emp8,
                       title="Lecturer",
                       category="Teaching",
                       post_date="2022-08-11", deadline_date="2022-09-11", salary=40000, required_experience=1,
                       vacancies=2,
                       job_context="Lecturer in CSE,ICT.",
                       job_nature="Part-time",
                       job_responsibilities="Assisting with various departmental duties and providing academic support to professors and other staff",
                       edu_requirement="PhD, Master's equivalent degree in relevant discipline and must have first class/division in all examinations.",
                       additional_requirements="Publications (Standard/ reputed journal) -Minimum 2-3",
                       application_process="Send your CV to brac@edu.bd ")
jobpost15.save()
jobpost16 = NewJobpost(jobpost_id=16, employer_id=emp9,
                       title="Professor",
                       category="Teaching",
                       post_date="2022-08-13", deadline_date="2022-09-13", salary=60000, required_experience=7,
                       vacancies=3,
                       job_context="Associate Professor/ Professor in CSE, ICT.",
                       job_nature="Part-time",
                       job_responsibilities="Teaching and supervising undergraduate and graduate students",
                       edu_requirement="PhD, Master's equivalent degree in relevant discipline and must have first class/division in all examinations.",
                       additional_requirements="Publications (Standard/ reputed journal) -Minimum 10-12",
                       application_process="Send your CV to uiu@edu.com ")
jobpost16.save()
jobpost17 = NewJobpost(jobpost_id=17, employer_id=emp10,
                       title="Senior IT Security Engineer",
                       category="Security",
                       post_date="2022-08-12", deadline_date="2022-09-12", salary=65000, required_experience=7,
                       vacancies=1,
                       job_context="Sumsung is one of the biggest MFIs in the country as well in the world with more than 25 thousand employees serving around 73 lakh clients across the country. Here all the applications are developed by in-house IT team.",
                       job_nature="Full-time",
                       job_responsibilities="Manage day-to-day IT security operations.Monitor and analyze data flow to identify and block malicious behaviors and activities.",
                       edu_requirement="B.Sc./ M.Sc. in CSE/ IT/ MIS/ Software Engineering/ ECE/ EEE or equivalent and relevant engineering degree. Certification on CEH/ CHFI (Preferred)",
                       additional_requirements="Age at most 40 years.Monitoring and analyzing network traffic, host-based security appliance logs and IDS alerts.xperience in working with applications such as Firewall Software, SIEM, IDS/IPS, PAM, DLP, VA & PT, WAF, Load Balancer etc. is preferred.",
                       application_process="Apply online ")
jobpost17.save()
jobpost18 = NewJobpost(jobpost_id=18, employer_id=emp1,
                       title="Network & IT Security.",
                       category="Security",
                       post_date="2022-08-10", deadline_date="2022-09-10", salary=60000, required_experience=8,
                       vacancies=2,
                       job_context="Optimizely is one of the leading ICT System Integration company in Bangladesh providing ICT solutions to its wide customer base in Bangladesh and abroad. Optimizely is looking for the position of `Trainer - Network & IT Security` to assist in its Voice, Network & IT Security Department.",
                       job_nature="Part-time",
                       job_responsibilities="Implementing, managing, monitoring, and upgrading security measures for the protection of the organization's data, systems, and networks.",
                       edu_requirement="B.Sc Engineering in CSE. Certification on CEH/ CHFI (Preferred)",
                       additional_requirements="Strong understanding of a complete ISP environment is required.In depth knowledge in routing, DNS, MAIL, DHCP, Proxy and Bandwidth management system.",
                       application_process="Apply online ")
jobpost18.save()
jobpost19 = NewJobpost(jobpost_id=19, employer_id=emp11,
                       title="Junior Programmer.",
                       category="Programming",
                       post_date="2022-08-13", deadline_date="2022-09-13", salary=45000, required_experience=1,
                       vacancies=2,
                       job_context="We are looking for Junior Programmers with high problem-solving & analytical capability with a minimum of 1-year experience.",
                       job_nature="Part-time",
                       job_responsibilities="Continuously discover, evaluate, and implement new technologies to maximize development efficiency.",
                       edu_requirement="Bachelor's degree in any discipline.",
                       additional_requirements="Good knowledge of Data Structure & Algorithms.150+ ACM problems solved (Mandatory Requirement).",
                       application_process="airbdrj@gmail.com ")
jobpost19.save()
jskill34 = JobSkill(job_skill_id=34,jobpost_id=jobpost14,skill_id=skill1)
jskill34.save()
jskill35 = JobSkill(job_skill_id=35,jobpost_id=jobpost14,skill_id=skill5)
jskill35.save()
question1 = Question(question_id=1, skill_id=skill2,
                     question_text="The library function exit( ) causes an exit from - ",
                     optionA="The program in which it occurs",
                     optionB="The function in which it occurs",
                     optionC="The block in which it occurs",
                     optionD="The loop in which it occurs",


                     mark=1,

                     answer="1",


                     time_limit="0:30")
question1.save()
question2 = Question(question_id=2, skill_id=skill2, question_text="In a linked list - ",
                     optionA=" Each link contains data or a pointer to data",
                     optionB="Links are stored in an array",
                     optionC="A array of pointers point to the link",
                     optionD=" Each link contains a pointer to the next link",


                     mark=1,

                     answer="4",


                     time_limit="0:30")
question2.save()
question3 = Question(question_id=3, skill_id=skill2,
                     question_text="In C++, which of the following can legitimately be passed to a function?",
                     optionA="A constant",
                     optionB="A variable",
                     optionC="A structure",
                     optionD="All of these",


                     mark=1,

                     answer="4",


                     time_limit="0:30")
question3.save()
question4 = Question(question_id=4, skill_id=skill2,
                     question_text="The dot operator connects which of the following two entities? ",
                     optionA=" Class object and member of that class",
                     optionB=" Class and member of that class",
                     optionC="Class object and a class",
                     optionD="Class member and class object",


                     mark=1,

                     answer="1",

                     time_limit="0:30")
question4.save()
question5 = Question(question_id=5, skill_id=skill2, question_text="A static function -  ",
                     optionA="Should be called when an object is destroyed",
                     optionB="Can be called using the class name and function",
                     optionC="Is closely connected with an individual object of a class",
                     optionD=" Is used when a dummy object must be created",


                     mark=1,

                     answer="2",

                     time_limit="0:30")
question5.save()
question6 = Question(question_id=6, skill_id=skill2, question_text="Which one of the following is a keyword?",
                     optionA="Size",
                     optionB="Key",
                     optionC="Jump",
                     optionD="Switch",
                     mark=1,
                     answer="4",
                     time_limit="0:30")
question6.save()
question7 = Question(question_id=7, skill_id=skill2, question_text="Which of the following is the correct syntax of including a user defined header files in C++?",
                     optionA="#include [userdefined]",
                     optionB="#include “userdefined”",
                     optionC="#include <userdefined.h>",
                     optionD="#include <userdefined>",
                     mark=1,
                     answer="2",
                     time_limit="0:30")
question7.save()
question8 = Question(question_id=8, skill_id=skill2, question_text="Which of the following is a correct identifier in C++?",
                     optionA="VAR_1234",
                     optionB="$var_name",
                     optionC="7VARNAME",
                     optionD="7var_name",
                     mark=2,
                     answer="1",
                     time_limit="0:45")
question8.save()
question9 = Question(question_id=9, skill_id=skill2, question_text="Which of the following approach is used by C++?",
                     optionA="Left-right",
                     optionB="Right-left",
                     optionC="Bottom-up",
                     optionD="Top-down",
                     mark=2,
                     answer="3",
                     time_limit="0:45")
question9.save()
question10 = Question(question_id=10, skill_id=skill2, question_text="What happens if the following C++ statement is compiled and executed?\n"
                                                                     "int *ptr = NULL;\n"
                                                                     "delete ptr;",
                     optionA="The program is not semantically correct",
                     optionB="The program is compiled and executed successfully",
                     optionC="The program gives a compile-time error",
                     optionD="The program compiled successfully but throws an error during run-time",
                     mark=2,
                     answer="2",
                     time_limit="0:45")
question10.save()
question11 = Question(question_id=11, skill_id=skill2, question_text="What is the difference between delete and delete[] in C++?",
                     optionA="delete is syntactically correct but delete[] is wrong and hence will give an error if used in any case",
                     optionB="delete is used to delete normal objects whereas delete[] is used to pointer objects",
                     optionC="delete is a keyword whereas delete[] is an identifier",
                     optionD="delete is used to delete single object whereas delete[] is used to multiple(array/pointer of) objects",
                     mark=1,
                     answer="4",
                     time_limit="0:30")
question11.save()
question12 = Question(question_id=12, skill_id=skill2, question_text="What happens if the following program is executed in C and C++?\n#include <stdio.h>\nint main(void){\nint new = 5;\nprintf(\"%d\", new); }",
                     optionA="Error in C and successful execution in C++",
                     optionB="Error in both C and C++",
                     optionC="Error in C++ and successful execution in C",
                     optionD="A successful run in both C and C++",
                     mark=2,
                     answer="3",
                     time_limit="0:45")
question12.save()
question13 = Question(question_id=13, skill_id=skill2, question_text="Which of the following type is provided by C++ but not C?",
                     optionA="double",
                     optionB="float",
                     optionC="int",
                     optionD="bool",
                     mark=1,
                     answer="4",
                     time_limit="0:30")
question13.save()
question14 = Question(question_id=14, skill_id=skill2, question_text="By default, all the files in C++ are opened in _________ mode.",
                     optionA="Binary",
                     optionB="VTC",
                     optionC="Text",
                     optionD="ISCII",
                     mark=1,
                     answer="3",
                     time_limit="0:30")
question14.save()
question15 = Question(question_id=15, skill_id=skill2, question_text="What is the size of wchar_t in C++?",
                     optionA="Based on the number of bits in the system",
                     optionB="2 or 4",
                     optionC="4",
                     optionD="2",
                     mark=2,
                     answer="1",
                     time_limit="0:45")
question15.save()



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
uskill4 = JobSeekerSkill(jobseeker_skill_id=4, isOpenToWork=True, skill_id=skill2, user_id=user1)
uskill4.save()
proj=Project(project_id=1,project_name="Istishon",project_link="https://github.com/adrita1999/ishtishon",project_short_desc="This is our 2-2 term project. It is basically a railway ticket booking website",user_id=user1)
proj.save()
proj_2=Project(project_id=2,project_name="csRecruitz",project_link="https://github.com/adrita1999/csRecruitZ",project_short_desc="This is our 4-1 term project. It is a job searching website. The development of the project is still ongoing",user_id=user1)
proj_2.save()
pub_1=Publication(publication_id=1,publication_name="SentiCR: A customized sentiment analysis tool for code review interactions",publication_link="https://ieeexplore.ieee.org/abstract/document/8115623",user_id=user1)
pub_1.save()
pub_2=Publication(publication_id=2,publication_name="Identification and Recognition of Rice Diseases and Pests Using Convolutional Neural Networks",publication_link="https://ui.adsabs.harvard.edu/abs/2018arXiv181201043R/abstract",user_id=user1)
pub_2.save()
lic_1=LicenseCertificate(certificate_id=1,certificate_name="IBM Data Science Professional Certificate",issuing_org="Coursera")
lic_1.save()
lic_2=LicenseCertificate(certificate_id=2,certificate_name="Deep Learning Specialization",issuing_org="Coursera")
lic_2.save()
js_1=JobseekerCertificate(jobseeker_certificate_id=1,certificate_id=lic_1,user_id=user1)
js_1.save()
js_2=JobseekerCertificate(jobseeker_certificate_id=2,certificate_id=lic_2,user_id=user1)
js_2.save()
