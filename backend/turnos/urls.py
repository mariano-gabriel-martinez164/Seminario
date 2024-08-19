from django.urls import path
from . import views

urlpatterns = [
    path('turnos/', views.TurnoAndTurnoTemplateList.as_view()),
    path('turnos/<int:pk>/', views.TurnoDetail.as_view()),
]