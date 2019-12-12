from django.contrib import admin
from .models import Ingredient, Fridge, Recipe

admin.site.register(Ingredient)
admin.site.register(Fridge)
admin.site.register(Recipe)
