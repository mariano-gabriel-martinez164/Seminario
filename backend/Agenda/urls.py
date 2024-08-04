from django.urls import path
from . import views

urlpatterns = [
    path('agendas/', views.AgendaList.as_view()),
    path('agendas/<int:pk>/', views.AgendaDetail.as_view()),
    path('turnotemplates/', views.TurnoTemplateList.as_view()),
    path('turnotemplates/<int:pk>/', views.TurnoTemplateDetail.as_view()),
]