import json
import os
import re
from django.core.management.base import BaseCommand, CommandError
from ...models import Ingredient


class Command(BaseCommand):

  def handle(self, *args, **options):
    autocomplete_ingredient()

def autocomplete_ingredient():

  BASE_DIR = os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))))

  datasets = f"{BASE_DIR}/fixtures/Ingridients_dataset/merged.json"
  
  with open(f"{datasets}", encoding='utf-8') as r:
    body = json.load(r)
    for each in body:
      for key, val in each.items():
        Ingredient.objects.create(
          name = val
        )


