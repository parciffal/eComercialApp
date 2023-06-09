from rest_framework import viewsets, permissions
from ..models import Product
from ..serializers import ProductSerializer
from rest_framework import filters


class ProductView(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [
         permissions.IsAuthenticatedOrReadOnly,]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'category__name', 'user__id']
