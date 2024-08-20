from django.urls import path
from . import views

urlpatterns = [
    path('', views.TurnoAndTurnoTemplateList.as_view()),
    path('<int:pk>/', views.TurnoDetail.as_view()),
]