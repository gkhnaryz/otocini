from django.contrib.auth.models import User
from rest_framework import serializers
from otocini.models import Message


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password']


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.SlugRelatedField(many=False, slug_field='username', queryset=User.objects.all())
    receiver = serializers.SlugRelatedField(many=False, slug_field='username', queryset=User.objects.all())
    #iliski modelini many ile belirledik, false dedik cunku one-to-one iliski
    #queryset ile ilgili nesnenin listesini cekiyorum
    class Meta:
        model = Message
        fields = ['sender', 'receiver', 'message', 'timestamp']
