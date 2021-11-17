"""Companies URLs."""

from django.urls import include, path

from rest_framework.routers import DefaultRouter

from quiniela.predictions.views.game_predictions import GamePredictionsViewSet

router = DefaultRouter()
router.register("game-predictions", GamePredictionsViewSet, basename="game-predictions")

app_name = "predictions"

urlpatterns = [
    path("", include((router.urls, "predictions"), namespace="predictions")),
]