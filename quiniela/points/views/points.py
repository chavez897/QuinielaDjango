import json
from rest_framework import mixins, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from quiniela.points.models.points import Points
from quiniela.points.serializers.points import PointsModelSerializer
from quiniela.predictions.models.current_week import CurrentWeek


class PointsViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):

    serializer_class = PointsModelSerializer
    queryset = Points.objects.filter(is_active=True)

    def get_permissions(self):
        permissions = [IsAuthenticated]
        return (permission() for permission in permissions)

    @action(detail=False, methods=["get"], url_path="standings")
    def create_predictions(self, request):
        current = CurrentWeek.objects.get(id=1)
        league = request.GET.get("league")
        points = Points.objects.filter(
            enrollment__league__slug=league, season=current.season
        ).order_by("enrollment__userprofile", "week")
        standings = {}
        for point in points:
            if point.enrollment.id not in standings:
                standings[point.enrollment.id] = {
                    "team_name": point.enrollment.team_name,
                    "team_picture": point.enrollment.team_picture.url,
                    "points": {},
                }
            standings[point.enrollment.id]["points"][point.week] = point.points
        return Response(standings, status=status.HTTP_200_OK)
