from django.db import models

from django.contrib.auth.models import User


# class User(models.Model):
#   first_name = models.CharField(max_length=50, blank=False)
#   last_name = models.CharField(max_length=50, blank=False)
#   email = models.EmailField(max_length=50, unique=True, blank=False)
#   created = models.DateTimeField(auto_now_add=True)

#   REQUIRED_FIELDS = ['first_name', 'last_name', 'email']

#   def __str__(self):
#     return (f'{self.first_name}, {self.last_name}')

class Ingredient(models.Model):
  name = models.CharField(max_length=50)
  source = models.URLField(max_length=500, blank=True)

  def __str__(self):
    return self.name

class Fridge(models.Model):
  ingredients = models.ManyToManyField(Ingredient)
  owners = models.ForeignKey(User, on_delete=models.CASCADE, related_name='fridges')

  def __str__(self):
    return self.owners

class Recipe(models.Model):
  title = models.CharField(max_length=50, blank=False)
  image = models.CharField(max_length=225, null=True)
  instructions = models.TextField(max_length=2000, blank=False)
  ingredients = models.CharField(max_length=50)
  items = models.ManyToManyField(Ingredient)

  def __str__(self):
    return self.title
