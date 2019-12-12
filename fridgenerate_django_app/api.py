from django.http import JsonResponse
from django.http import HttpResponse
import requests
import json
import os
import pdb
from .config import api_key
# from django.conf import settings

# api_key = settings.API_KEY

def get_recipe(request):
  recipe_id = json.loads(request.body)['data']['recipe_id']

  # print('request', json.loads(request.body)['data']['recipe_id'])
  # print("POST:", recipe_id)

  response = requests.get(f"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/{recipe_id}/information",
                        headers={
                          "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                          "X-RapidAPI-Key": api_key
                        })

  recipe = json.loads(response.content)
  recipe_title = recipe["title"]
  recipe_image = recipe["image"]
  recipe_instruction = recipe["instructions"]
  recipe_ingredients = recipe["extendedIngredients"]

  ingredientStrings = []
  ingredients = []
  for ingredient in recipe_ingredients: 
    ingredients.append(ingredient["name"])
    ingredientStrings.append(ingredient["originalString"])

  return JsonResponse({
    'id': recipe_id,
    'name': recipe_title,
    'image': recipe_image,
    'ingredients': ingredients,
    'instructions': recipe_instruction,
    'originalString': ingredientStrings,
  })

def get_recipes_by_ingredients(request):
  ingredients_query = json.loads(request.body.decode('utf-8'))
  
  # print("POST:", ingredients_query)

  ingredients_url = f"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=15&ingredients={ingredients_query}"

  response = requests.get(ingredients_url,
    headers={
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "X-RapidAPI-Key": api_key
    }
  )

  recipe_list = json.loads(response.content)

  return JsonResponse({
    'recipes': [{
      'id': r['id'],
      'name': r['title'],
      'image': r['image'],
      # 'readyInMinutes': r['readyInMinutes'],
      'missing_ingredients': r['missedIngredientCount'],
    } for r in recipe_list]
  })

def get_random_recipes(request):

  random_url = f"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number={15}"

  response = requests.get(random_url,
    headers={
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "X-RapidAPI-Key": api_key
    }
  )

  recipe_list = json.loads(response.content)

  return JsonResponse({
    'recipes': [{
      'id': r['id'],
      'name': r['title'],
      'image': r['image'],
    } for r in recipe_list['recipes']]
  })


def get_similar_recipes(request):
  recipe_id = json.loads(request.body)['data']['recipe_id']

  similar_url = f"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/{recipe_id}/similar"

  response = requests.get(similar_url,
    headers={
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "X-RapidAPI-Key": api_key
    }
  )

  similar_recipes = json.loads(response.content)

  return JsonResponse({
    'recipes': [{
      'id': r['id'],
      'name': r['title'],
      'image': r['image'],
    } for r in similar_recipes]
  })



def rest_api(request):
  headers = {}
  headers['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTYyODc5MjMzLCJqdGkiOiIxY2YzYjIxNDY3MWQ0YjNhODNhZjVlODliYzNjZGI3ZCIsInVzZXJfaWQiOjF9.c60luctge5K9O3pk7OAYCOi6zXWqHGMgyu8dDaBfZx8'
  response = requests.get('http://localhost:8000/fridges', headers=headers)
  return HttpResponse(response.text)
