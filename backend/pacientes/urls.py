from django.urls import path
from . import views

urlpatterns = [
    path('pacientes/', views.PacientesList.as_view()),
    path('pacientes/<int:pk>/', views.PacienteDetail.as_view()),
]