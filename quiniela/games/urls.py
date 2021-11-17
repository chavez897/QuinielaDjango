"""Companies URLs."""

from django.urls import include, path

from rest_framework.routers import DefaultRouter

from quiniela.games.views.games import GamesViewSet

router = DefaultRouter()
router.register("games", GamesViewSet, basename="games")

app_name = "games"

urlpatterns = [
    path("", include((router.urls, "games"), namespace="games")),
]