from .category_model import *
from .products_model import *
from .profile_model import *

def get_superuser():
    user = User.objects.filter(is_superuser=True).first()
    return user