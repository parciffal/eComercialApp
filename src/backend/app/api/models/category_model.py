from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=250)

    class Meta:
        ordering = ('name',)
        verbose_name = 'category'
        verbose_name_plural = 'categories'


    def __str__(self) -> str:
        return str(self.name)

    def as_json(self):
        return {
            "id": self.id,
            "name": self.name
        }

    