# from django.conf.urls import url
from django.urls import path
from .views import ZeroTouchListApiView

urlpatterns = [
    path("api", ZeroTouchListApiView.as_view()),
]
