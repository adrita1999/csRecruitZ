from rest_framework import serializers
from .models import *
from datetime import date
class postSerializer(serializers.ModelSerializer):
    class Meta:
        model=Jobpost
        fields=['id','title']
    # def create(self, validated_data):
    #     return Jobpost.objects.create(validated_data)
    #
    # def update(self, instance, validated_data):
    #     instance.title=validated_data.get('title',instance.title)
class EmployerSerializer(serializers.ModelSerializer):
    class Meta:
        model= Employer
        fields='__all__'

class NewPostSerializer(serializers.ModelSerializer):
    #print("serialiser")
    emp_name = serializers.SerializerMethodField("get_emp_name")
    emp_district = serializers.SerializerMethodField("get_emp_district")
    emp_division = serializers.SerializerMethodField("get_emp_division")
    class Meta:
        model= NewJobpost
        fields='__all__'

    def get_emp_name(self, obj):
        return obj.employer_id.name

    def get_emp_district(self, obj):
        return obj.employer_id.district

    def get_emp_division(self, obj):
        return obj.employer_id.division

class jobseekerSerializer(serializers.ModelSerializer):
    #print("serialiser")
    age=serializers.SerializerMethodField()
    class Meta:
        model= Jobseeker
        fields='__all__'
    def get_age(self,obj):
        today = date.today()
        day=((today - obj.date_of_birth).days)
        return day//365



class jobexpSerializer(serializers.ModelSerializer):
    #print("serialiser")
    class Meta:
        model= JobExperience
        fields='__all__'

class uskillSerializer(serializers.ModelSerializer):
    #print("serialiser")
    skill_name = serializers.SerializerMethodField("get_skill_name")
    class Meta:
        model= JobSeekerSkill
        fields='__all__'

    def get_skill_name(self, obj):
        return obj.skill_id.skill_name