from django.urls import path
from .views import *


urlpatterns = [
    path('',apiOverview, name='api-overview'),
    path('todo-create/',apiCreate ,name='api-create'),
    path('todo-list/',apiList ,name='api-list'),
    path('todo-delete/<str:pk>/',apiDelete, name='api-delete'),
    path('todo-update/<str:pk>/',apiUpdate, name='api-update'),
]