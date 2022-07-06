from rest_framework import serializers
from .models import Jobpost

class postSerializer(serializers.ModelSerializer):
    class Meta:
        model=Jobpost
        fields=['id','title']
    # def create(self, validated_data):
    #     return Jobpost.objects.create(validated_data)
    #
    # def update(self, instance, validated_data):
    #     instance.title=validated_data.get('title',instance.title)