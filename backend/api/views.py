from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import *
# Create your views here.


@api_view(['GET', ])
def apiOverview(request):
    api_urls = {
        'List': '/todo-list/',
        'Create': '/todo-create/',
        'Delete': '/todo-delete/<str:pk>/',
        'Update': '/todo-update/<str:pk>/'
    }
    return Response(api_urls)


@api_view(['POST', ])
def apiCreate(request):
    serializers = TodoSerializer(data=request.data)
    if serializers.is_valid():
        serializers.save()
    return Response("Created Successfully.")


@api_view(['DELETE', ])
def apiDelete(request, pk):
    todo = Todo.objects.get(id=pk)
    todo.delete()
    return Response("Deleted Successfully.")


@api_view(['GET', ])
def apiList(request):
    todos = Todo.objects.all().order_by('-id')
    serializers = TodoSerializer(todos, many=True)
    return Response(serializers.data)


@api_view(['POST', ])
def apiUpdate(request, pk):
    todo = Todo.objects.get(id=pk)
    todo.title = request.data['title']
    todo.detail = request.data['detail']
    todo.save()
    return Response("Updated Successfully.")
