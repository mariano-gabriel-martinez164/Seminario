from django.urls import path
from . import views

urlpatterns = [
    path('centro/',views.CentrosOdontologicosList.as_view()),
    path('centro/<int:pk>/',views.CentroOdontologicoDetail.as_view()),

    path('odontologo/',views.OdontologosList .as_view()),
    path('odontologo/<int:pk>/',views.OdontologoDetail.as_view()),

    path('piezaDental/',views.PiezasDentalesList.as_view()),
    path('piezaDental/<int:pk>/',views.PiezaDentalDetail.as_view()),

    path('prestacion/',views.PrestacionesList.as_view()),
    path('prestacion/<int:pk>/',views.PrestacionDetail.as_view()),
]