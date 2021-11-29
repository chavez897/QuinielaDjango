"""Companies URLs."""

from django.urls import include, path

from rest_framework.routers import DefaultRouter

from quiniela.points.views.points import PointsViewSet

router = DefaultRouter()
router.register("points", PointsViewSet, basename="points")

app_name = "points"

urlpatterns = [
    path("", include((router.urls, "points"), namespace="points")),
]
