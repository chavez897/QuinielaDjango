"""Companies URLs."""

from django.urls import include, path

from rest_framework.routers import DefaultRouter

from quiniela.league.views.league import LeagueViewSet

router = DefaultRouter()
router.register("league", LeagueViewSet, basename="league")

app_name = "league"

urlpatterns = [
    path("", include((router.urls, "league"), namespace="league")),
]