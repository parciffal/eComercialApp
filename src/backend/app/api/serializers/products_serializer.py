from rest_framework import serializers

from .category_serializer import CategorySerializer
from ..models import Product

class ProductSerializer(serializers.ModelSerializer):
    """
    serializer for categories that serialize all of the fields
    based on Category model

    """
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "category",
            "price",
            "about",
            "user",
            "image",
            "contact"
        )
