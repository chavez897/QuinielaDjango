from rest_framework import mixins, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from quiniela.league.models.league import League
from quiniela.league.serializers.league import LeagueModelSerializer, EnrollLeagueSerializer
from quiniela.league.serializers.userprofile_league_enrollment import UserprofileLeagueEnrollmentModelSerializer
from quiniela.users.models import UserProfile
from quiniela.users.serializers.users import UserPlayerSerializer
from quiniela.league.models.userprofile_league_enrollment import UserprofileLeagueEnrollment


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

    @action(detail=False, methods=["get"], url_path="league-players")
    def league_players(self, request):
        league_id = self.request.query_params.get("league", "")
        if not League.objects.filter(id=league_id).exists():
            return Response({}, status=status.HTTP_404_NOT_FOUND)
        league = League.objects.get(id=league_id)
        users = UserprofileLeagueEnrollment.objects.filter(league=league)
        serializer = UserprofileLeagueEnrollmentModelSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
