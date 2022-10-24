# from django.conf.urls import url
from django.urls import path
from .views import ZeroTouchListApiView
from rest_framework_nested import routers
from . import views


router = routers.DefaultRouter()
router.register("fields", views.FieldViewSet)


# urlpatterns = [
#     path("api", ZeroTouchListApiView.as_view()),
#     # path("fields", views.FieldViewSet),
# ]
urlpatterns = router.urls
