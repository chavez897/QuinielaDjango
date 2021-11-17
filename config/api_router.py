from django.conf import settings
from django.urls import include, path
from rest_framework.routers import DefaultRouter, SimpleRouter
from rest_framework_simplejwt.views import TokenRefreshView

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
urlpatterns = [
    path("", include((router.urls, "auth"), namespace="auth")),
    path(
        "token/",
        include(
            [  # noqa DJ05
                path("refresh/", TokenRefreshView.as_view(), name="token_refresh")
            ]
        ),
    ),
    path(
        "", 
        include(
            [
                path(
                    "",
                    include(
                        ("quiniela.league.urls", "league"),
                        namespace="league",
                    ),
                ),
            ]
        ),
    ),
    path(
        "", 
        include(
            [
                path(
                    "",
                    include(
                        ("quiniela.games.urls", "games"),
                        namespace="games",
                    ),
                ),
            ]
        ),
    ),
    path(
        "", 
        include(
            [
                path(
                    "",
                    include(
                        ("quiniela.predictions.urls", "predictions"),
                        namespace="preditcions",
                    ),
                ),
            ]
        ),
    ),

]
