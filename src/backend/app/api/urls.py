from django.urls import path, include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register('product', ProductView)
router.register('user', UserView)
router.register('category', CategoryView)
router.register('profile', ProfileView)
urlpatterns = [
    
    path('', include(router.urls)),
    path('items/', ProfileProductsView.as_view(), name='profile-products'),
    path('items/<int:pk>/', ProfileProductDetailView.as_view(), name='profile-product-detail'),
]
