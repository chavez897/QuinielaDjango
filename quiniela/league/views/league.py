from rest_framework import mixins, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from quiniela.league.models.league import League
from quiniela.league.serializers.league import LeagueModelSerializer, EnrollLeagueSerializer


class LeagueViewSet(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):

    serializer_class = LeagueModelSerializer
    queryset = League.objects.filter(is_active=True).order_by("name")
    lookup_field = "slug"

    def get_permissions(self):
        permissions = []
        return (permission() for permission in permissions)
    
    @action(detail=False, methods=["post"], url_path="enroll-league")
    def enroll_league(self, request):
        serializer = EnrollLeagueSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)