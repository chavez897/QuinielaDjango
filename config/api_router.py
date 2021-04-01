from django.conf import settings
from rest_framework.routers import DefaultRouter, SimpleRouter

from quiniela.users.views.users import UserViewSet
from quiniela.users.views.auth import (
    UserAuthNonAtomicViewSet,
    UserAuthViewSet,
)

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

# Auth
router.register("auth", UserAuthViewSet, basename="auth")
router.register("auth", UserAuthNonAtomicViewSet, basename="auth_not_atomic")
router.register("users", UserViewSet)


app_name = "api"
urlpatterns = router.urls
