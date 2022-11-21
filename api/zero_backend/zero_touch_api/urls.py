# from django.conf.urls import url
from django.urls import path
from .views import ZeroTouchListApiView
from rest_framework_nested import routers
from . import views


router = routers.DefaultRouter()
router.register("fields", views.FieldViewSet, basename="fields")
router.register("routers", views.RouterViewSet)

fields_router = routers.NestedDefaultRouter(router, "fields", lookup="field")
fields_router.register("images", views.FieldImageViewSet, basename="field-images")

# urlpatterns = [
#     path("api", ZeroTouchListApiView.as_view()),
#     # path("fields", views.FieldViewSet),
# ]
urlpatterns = router.urls + fields_router.urls
