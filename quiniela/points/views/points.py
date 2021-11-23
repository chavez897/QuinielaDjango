import json
from rest_framework import mixins, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.sites.models import Site
from django.conf import settings

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
    def standings(self, request):
        current_site = Site.objects.get_current()

        current = CurrentWeek.objects.get(id=1)
        league = request.GET.get("league")
        points = Points.objects.filter(
            enrollment__league__slug=league, season=current.season
        ).order_by("enrollment__userprofile", "week")
        help_object = {}
        for point in points:
            picture_url = None
            print(point.enrollment.team_picture)
            if (
                point.enrollment.team_picture is not None
                and not point.enrollment.team_picture == ""
            ):
                if settings.IS_DEV:
                    picture_url = (
                        current_site.domain + point.enrollment.team_picture.url
                    )
                else:
                    picture_url = point.enrollment.team_picture.url
            print(picture_url)
            if point.enrollment.id not in help_object:
                help_object[point.enrollment.id] = {
                    "id": point.id,
                    "team_name": point.enrollment.team_name,
                    "team_picture": picture_url,
                    "points": [0] * current.week,
                    "total": 0,
                    "place": 1,
                }
            help_object[point.enrollment.id]["points"][point.week - 1] = point.points
            help_object[point.enrollment.id]["total"] = (
                help_object[point.enrollment.id]["total"] + point.points
            )
        standings = list(help_object.values())
        standings.sort(key=lambda x: x["total"], reverse=True)
        for x in range(1, len(standings)):
            if standings[x - 1]["total"] == standings[x]["total"]:
                standings[x]["place"] = standings[x - 1]["place"]
            else:
                standings[x]["place"] = x + 1
        return Response(standings, status=status.HTTP_200_OK)
