from rest_framework import serializers
from .models import *

class postSerializer(serializers.ModelSerializer):
    class Meta:
        model=Jobpost
        fields=['id','title']
    # def create(self, validated_data):
    #     return Jobpost.objects.create(validated_data)
    #
    # def update(self, instance, validated_data):
    #     instance.title=validated_data.get('title',instance.title)


class NewPostSerializer(serializers.ModelSerializer):
    #print("serialiser")
    class Meta:
        model= NewJobpost
        fields='__all__'

class jobseekerSerializer(serializers.ModelSerializer):
    #print("serialiser")
    class Meta:
        model= Jobseeker
        fields='__all__'