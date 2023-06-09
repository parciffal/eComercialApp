from rest_framework import viewsets, permissions
from rest_framework import filters

from ..models import Category
from ..serializers import  CategorySerializer

class CategoryView(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [ permissions.IsAuthenticatedOrReadOnly, permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

