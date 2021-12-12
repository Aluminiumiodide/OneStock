from django.contrib import admin

# Register your models here.
from django.apps import apps
from django.contrib.admin.sites import AlreadyRegistered

# Register your models here.

models = apps.get_models()
for model in models:
    try:
        admin.site.register(model)
    except AlreadyRegistered:
        pass