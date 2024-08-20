from django.urls import path
from . import views

urlpatterns = [
    path('', views.PacientesList.as_view()),
    path('<int:pk>/', views.PacienteDetail.as_view()),
]