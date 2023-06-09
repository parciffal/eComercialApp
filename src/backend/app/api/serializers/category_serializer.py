from rest_framework import serializers
from ..models import  Category

class CategorySerializer(serializers.ModelSerializer):
    """
    serializer for categories that serialize all of the fields
    based on Category model

    """

    class Meta:
        model = Category
        fields = ("name",)