from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView


from .models import User, Ingredient, Recipe, Fridge
from .serializers import IngredientSerializer, RecipeSerializer, UserSerializer, UserSerializerWithToken, FridgeSerializer

class IngredientView(viewsets.ModelViewSet):
  queryset = Ingredient.objects.all()
  serializer_class = IngredientSerializer

class RecipeView(viewsets.ModelViewSet):
  queryset = Recipe.objects.all()
  serializer_class = RecipeSerializer

@api_view(['GET'])
def current_user(request):
  serializer = UserSerializer(request.user)
  return Response(serializer.data)

class UserView(APIView):
  # queryset = User.objects.all()
  # serializer_class = UserSerializer

  permission_classes = (permissions.AllowAny,)

  def post(self, request, format=None):
    serializer = UserSerializerWithToken(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FridgeView(viewsets.ModelViewSet):
  queryset = Fridge.objects.all()
  serializer_class = FridgeSerializer



