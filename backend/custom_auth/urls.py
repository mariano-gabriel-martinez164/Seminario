from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('administrativos/', views.AdministrativoList.as_view()),
    path('administrativos/<int:pk>/', views.AdministrativoDetail.as_view()),
    path('gettoken/', obtain_auth_token),
    path('changepassword/', views.ChangePasswordView.as_view()),
    path('administrativos/me/', views.AdministrativoData.as_view()),
]