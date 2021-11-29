"""Companies URLs."""

from django.urls import include, path

from rest_framework.routers import DefaultRouter

from quiniela.predictions.views.game_predictions import GamePredictionsViewSet
from quiniela.predictions.views.current_week import CurrentWeekViewSet

router = DefaultRouter()
router.register("game-predictions", GamePredictionsViewSet, basename="game-predictions")
router.register("current-week", CurrentWeekViewSet, basename="current-week")

app_name = "predictions"

urlpatterns = [
    path("", include((router.urls, "predictions"), namespace="predictions")),
]
