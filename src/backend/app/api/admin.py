from django.contrib import admin
from .models import Product, Category, Profile


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    """ adding the product class to the admin site """

    list_display = (
        'name', "price", "about", "user")

    search_fields = ("name", "category",)
    list_editable = ['price']


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """ adding category class to the admin site """

    list_display = ("id", "name")
    

admin.site.register(Profile)
