from django.urls import path
from . import views

urlpatterns = [
    path('centros/',views.CentrosOdontologicosList.as_view()),
    path('centros/<int:pk>/',views.CentroOdontologicoDetail.as_view()),

    path('odontologos/',views.OdontologosList .as_view()),
    path('odontologos/<int:pk>/',views.OdontologoDetail.as_view()),

    path('piezasDentales/',views.PiezasDentalesList.as_view()),
    path('piezasDentales/<int:pk>/',views.PiezaDentalDetail.as_view()),

    path('prestaciones/',views.PrestacionesList.as_view()),
    path('prestaciones/<int:pk>/',views.PrestacionDetail.as_view()),
]