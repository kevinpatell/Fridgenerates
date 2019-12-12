"""fridgenerate URL Configuration
The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token
from fridgenerate_django_app import api


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', admin.site.urls),
    path('recipe_details/', api.get_recipe),
    path('recipes/', api.get_recipes_by_ingredients),
    path('random_recipes/', api.get_random_recipes),
    path('similar_recipes/', api.get_similar_recipes),
    path('', include('fridgenerate_django_app.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('api/token/', obtain_jwt_token, name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/rest/fridges', api.rest_api)
]

