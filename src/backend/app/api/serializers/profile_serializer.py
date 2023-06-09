from rest_framework import serializers

from django.shortcuts import get_object_or_404

from ..models import Profile

from .user_serializer import UserSerializer
from .products_serializer import ProductSerializer

class ProfileSerializer(serializers.HyperlinkedModelSerializer):

    products = ProductSerializer(many=True)
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = (
            'id', "user", "products", "image","phone")


