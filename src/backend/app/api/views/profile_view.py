from rest_framework import generics, permissions, status, viewsets, permissions
from rest_framework.views import Response
from ..models import Profile
from ..serializers import ProfileSerializer, ProductSerializer



class ProfileView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [ permissions.IsAuthenticated ]
    search_fields = [
        'product__name',
        'product__category__name'    ]


class ProfileProductsView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        profile = Profile.objects.get(user=self.request.user)
        return profile.products.all()

    def post(self, request, *args, **kwargs):
        profile = Profile.objects.get(user=request.user)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            product = serializer.save()
            profile.products.add(product)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfileProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        profile = Profile.objects.get(user=self.request.user)
        return profile.products.all()

    def delete(self, request, *args, **kwargs):
        profile = Profile.objects.get(user=request.user)
        product = self.get_object()
        profile.products.remove(product)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
