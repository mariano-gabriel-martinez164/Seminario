from django.urls import path
from . import views

urlpatterns = [
    path('turnos/', views.TurnoList.as_view()),
    path('turnosFull/', views.TurnoAndTurnoTemplateList.as_view()),
]