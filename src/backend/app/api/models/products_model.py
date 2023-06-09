from django.db import models
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_delete
from django.dispatch.dispatcher import receiver

from .category_model import Category

def product_image(instance, filename):
    return 'images/{0}.jpg'.format(instance.id)


class Product(models.Model):
    name = models.CharField(default='')
    image = models.ImageField(upload_to=product_image, blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    price = models.BigIntegerField(default=0)
    about = models.TextField(default="")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    contact = models.CharField(default='')

    class Meta:
        verbose_name_plural = "Product"

    def __str__(self) -> str:
        return str(self.name)

    def as_json(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "category": self.category.as_json(),
            "price": self.price,
            "about": self.about,
            "user": self.user.as_json(),
            "contact": self.contact
        }

@receiver(post_delete, sender=Product)
def product_image_delete(sender, instance, **kwargs):
    if instance.image:
        instance.image.delete(True)
